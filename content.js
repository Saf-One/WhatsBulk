/*
 * WhatsApp Web Message Sender - Content Script
 */
"use strict";

// Script state tracking
let injectedScripts = false;

// Sleep function
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Resource URLs
const patchScriptURL = chrome.runtime.getURL("js/webResource_patch.js");
const debugScriptURL = chrome.runtime.getURL("js/debug.js");

// Inject the needed scripts
async function injectScripts() {
    if (injectedScripts) return; // Only inject once

    console.log("Injecting scripts...");

    try {
        // First inject the patch script (simpler, more focused implementation)
        const patchScript = document.createElement('script');
        patchScript.setAttribute("type", "text/javascript");
        patchScript.setAttribute("id", "webResourcePatch");
        patchScript.src = patchScriptURL;

        // Create a promise for script loading
        const patchLoaded = new Promise((resolve, reject) => {
            patchScript.onload = () => {
                console.log('webResource_patch.js loaded successfully');
                resolve();
            };
            patchScript.onerror = (err) => {
                console.error('Failed to load webResource_patch.js:', err);
                reject(err);
            };
        });

        // Append the script
        document.head.appendChild(patchScript);

        // Wait for script to load before injecting debug
        await patchLoaded;

        // Now inject debug script
        const debugScript = document.createElement('script');
        debugScript.setAttribute("type", "text/javascript");
        debugScript.setAttribute("id", "debugScript");
        debugScript.src = debugScriptURL;

        debugScript.onload = function() {
            console.log('debug.js loaded successfully');
        };
        debugScript.onerror = function(err) {
            console.error('Failed to load debug.js:', err);
        };

        document.head.appendChild(debugScript);
        injectedScripts = true;
    } catch (error) {
        console.error('Error injecting scripts:', error);
    }
}

// Wait for WhatsApp Web to load fully
window.addEventListener('load', async function() {
    console.log("WhatsApp Web page loaded, waiting for app to initialize...");

    // Wait for app to be ready before injecting scripts
    for (let i = 0; i < 30; i++) {
        if (document.getElementsByClassName('app').length > 0 ||
            document.querySelector('div[data-testid="chat-list"]') !== null) {
            console.log("WhatsApp Web app detected, injecting scripts...");
            await injectScripts();
            break;
        }
        await sleep(1000);
    }
});

// Create a helper element for navigation if needed
if (!document.getElementById("wamessager")) {
    const navigationHelper = document.createElement("a");
    navigationHelper.id = "wamessager";
    document.body.append(navigationHelper);
}

// Listen for messages from the popup/background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    handleRequest(request, sender, sendResponse);
    // Keep the message channel open for async responses
    return true;
});

// Handle messages from popup/background
async function handleRequest(request, sender, sendResponse) {
    console.log("Content script received message:", request);

    // Handle open chat request (for popup.js)
    if (request.action === "openChat") {
        const number = request.number;
        console.log("Opening chat for:", number);

        // First ensure scripts are injected
        if (!injectedScripts) {
            await injectScripts();
        }

        // Open chat URL
        window.location.href = `https://web.whatsapp.com/send?phone=${number}`;

        // Indicate we've received the message
        sendResponse({ status: "opening chat" });

        // Wait for the chat to open
        await sleep(2000);

        if (request.message) {
            // Wait a bit more for the chat to fully load
            await sleep(2000);
            console.log("Sending text message:", request.message);

            // Use vanilla JS to find and fill the input box
            const inputBox = document.querySelector('div[contenteditable="true"]');
            if (inputBox) {
                // Set text and dispatch events
                inputBox.textContent = request.message;
                inputBox.dispatchEvent(new Event('input', { bubbles: true }));

                // Find and click the send button
                setTimeout(() => {
                    const sendButton = document.querySelector('span[data-icon="send"]');
                    if (sendButton) {
                        sendButton.click();
                        console.log("Message sent");
                    } else {
                        console.error("Send button not found");
                    }
                }, 500);
            } else {
                console.error("Input box not found");
            }
        }

        if (request.attachment) {
            // Wait for the chat to be fully loaded and ready
            await sleep(5000); // Increased to 5 seconds for better reliability
            console.log("Sending attachment:", request.attachment);

            // Send using injected script
            window.postMessage({
                type: 'FROM_CONTENT_SCRIPT',
                message: {
                    request: 'sendAttachment',
                    attachment: request.attachment,
                    number: request.number
                }
            }, '*');

            // Listen for completion
            let attachmentSent = false;
            const attachmentListener = (event) => {
                if (event.data && event.data.type === 'attachment_status') {
                    console.log('Received attachment status:', event.data);

                    if (event.data.status === 'success') {
                        console.log('Attachment sent successfully!');
                        attachmentSent = true;
                        window.removeEventListener('message', attachmentListener);
                    } else if (event.data.status === 'error') {
                        console.error('Error sending attachment:', event.data.error);
                        window.removeEventListener('message', attachmentListener);
                    }
                }
            };

            window.addEventListener('message', attachmentListener);

            // Also listen for the custom event from webResource_patch.js
            const customEventListener = () => {
                console.log('Custom event wam:attachments-sent received');
                attachmentSent = true;
                window.removeEventListener('wam:attachments-sent', customEventListener);
            };

            window.addEventListener('wam:attachments-sent', customEventListener);

            // Wait for attachment to be sent (with timeout)
            const timeout = 60000; // 60 seconds
            const startTime = Date.now();
            while (!attachmentSent && (Date.now() - startTime < timeout)) {
                await sleep(500);
            }

            // Clean up listeners
            window.removeEventListener('message', attachmentListener);
            window.removeEventListener('wam:attachments-sent', customEventListener);

            if (!attachmentSent) {
                console.error('Timed out waiting for attachment to be sent');
            } else {
                console.log('Attachment sent within timeout');
            }
        }
    }
}