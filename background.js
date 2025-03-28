/**
 * Background script for WhatsApp Tester extension
 * Handles opening WhatsApp Web if needed
 */

// Listen for extension installation
chrome.runtime.onInstalled.addListener(function() {
    console.log('WhatsApp Tester extension installed');
});

// Check if WhatsApp Web is open, open it if not
async function ensureWhatsAppWebOpen() {
    try {
        const tabs = await chrome.tabs.query({ url: 'https://web.whatsapp.com/*' });

        if (tabs.length > 0) {
            // WhatsApp is already open, focus that tab
            await chrome.tabs.update(tabs[0].id, { active: true });
            return { success: true, tabId: tabs[0].id };
        } else {
            // Open WhatsApp Web in a new tab
            const newTab = await chrome.tabs.create({ url: 'https://web.whatsapp.com/' });
            return { success: true, tabId: newTab.id };
        }
    } catch (error) {
        console.error('Error opening WhatsApp Web:', error);
        return { success: false, error: error.message };
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Open WhatsApp Web in a new tab
    if (request.action === 'openWhatsAppWeb') {
        ensureWhatsAppWebOpen().then(result => {
            sendResponse(result);
        });
        return true; // Keep the message channel open for the async response
    }

    // Relay a message to a specific tab
    if (request.action === 'relayToTab' && request.tabId) {
        chrome.tabs.sendMessage(request.tabId, request.message, response => {
            sendResponse(response);
        });
        return true; // Keep the message channel open for the async response
    }
});

// When extension icon is clicked, ensure WhatsApp Web is open
chrome.action.onClicked.addListener(function() {
    ensureWhatsAppWebOpen();
});