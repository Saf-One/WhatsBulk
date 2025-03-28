/*
 * WhatsApp Web Bulk Sender - Content Script
 * This script injects the webResource.js script directly into the WhatsApp Web page
 */
"use strict";

// Directly inject the webResource.js script as the working extension does
(function() {
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("id", "webResource");
    script.src = chrome.runtime.getURL("js/webResource.js");
    script.onload = function() {
        this.parentNode.removeChild(this);
        console.log('WebResource script loaded and self-removed');
    };
    document.head.appendChild(script);
})();

// Store information about the current state
let myNumber = null;
let currentState = { state: "STOP" };

// Initialize on window load
window.onload = function() {
    try {
        // Get user's own number from WhatsApp Web storage
        if (window.localStorage.getItem("last-wid")) {
            var widData = window.localStorage.getItem("last-wid");
            myNumber = widData.split("@")[0].substring(1);
        } else {
            widData = window.localStorage.getItem("last-wid-md");
            myNumber = widData.split(":")[0].substring(1);
        }
        chrome.storage.local.set({ currentState });
    } catch (e) {
        console.error("Error initializing content script:", e);
    }
};

// Create a helper element for navigation if needed
if (!document.getElementById("wamessager")) {
    const navigationHelper = document.createElement("a");
    navigationHelper.id = "wamessager";
    document.body.append(navigationHelper);
}

// Function to sleep (pause execution)
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Open chat with a specific number
async function openChat(number) {
    return new Promise(async(resolve) => {
        // Create and use a temporary link to open the chat
        const link = document.getElementById("wamessager") || document.createElement("a");
        link.setAttribute("href", `https://api.whatsapp.com/send?phone=${number}`);
        link.click();

        // Wait for the chat to open
        await sleep(1000);
        resolve(true);
    });
}

// Send text message to current open chat
async function sendText(text) {
    return new Promise(async(resolve) => {
        try {
            // Wait for text box to be available
            await sleep(500);

            // Insert text using paste event
            const textbox = document.querySelectorAll("[contenteditable='true']")[1];
            if (!textbox) {
                throw new Error("Text input field not found");
            }

            // Set up clipboard data and paste event
            const dataTransfer = new DataTransfer();
            dataTransfer.setData("text", text);
            const pasteEvent = new ClipboardEvent("paste", {
                clipboardData: dataTransfer,
                bubbles: true
            });
            textbox.dispatchEvent(pasteEvent);

            // Click send button after short delay
            await sleep(500);
            const sendButton = document.querySelector('span[data-icon="send"]');
            if (sendButton) {
                sendButton.click();
                resolve(true);
            } else {
                throw new Error("Send button not found");
            }
        } catch (error) {
            console.error("Error sending text:", error);
            resolve(false);
        }
    });
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

    // Check if the message is a greeting/status check
    if (request.greeting === "hello") {
        sendResponse({
            number: myNumber,
            date: new Date().toDateString()
        });
        return;
    }

    // Handle send text message request
    if (request.action === "sendText") {
        try {
            await openChat(request.number);
            const result = await sendText(request.text);
            sendResponse({ success: result });
        } catch (error) {
            console.error("Error handling sendText:", error);
            sendResponse({ success: false, error: error.message });
        }
        return;
    }

    // Handle send image request
    if (request.action === "sendImage") {
        try {
            // First open the chat with the recipient
            await openChat(request.number);

            // Use postMessage to communicate with the injected script
            window.postMessage({
                type: "FROM_CONTENT_SCRIPT",
                message: {
                    request: "sendAttachment",
                    attachment: request.attachment,
                    number: request.number
                }
            }, "*");

            // Listen for response from the injected script
            window.addEventListener("wam:attachments-sent", function handleEvent(event) {
                window.removeEventListener("wam:attachments-sent", handleEvent);
                console.log("Attachment sent response received");
                sendResponse({ success: true });
            }, { once: true });

            // Set timeout to handle no response
            setTimeout(() => {
                sendResponse({ success: false, error: "Timeout waiting for response" });
            }, 15000);
        } catch (error) {
            console.error("Error handling sendImage:", error);
            sendResponse({ success: false, error: error.message });
        }
        return;
    }
}