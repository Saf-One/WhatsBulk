/**
 * Background script for WhatsApp Tester extension
 * Handles opening WhatsApp Web if needed
 */

// Listen for extension installation
chrome.runtime.onInstalled.addListener(function() {
    console.log('WhatsApp Tester extension installed');
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Open WhatsApp Web in a new tab
    if (request.action === 'openWhatsAppWeb') {
        chrome.tabs.create({ url: 'https://web.whatsapp.com/' }, function(tab) {
            sendResponse({ success: true, tabId: tab.id });
        });
        return true; // Keep the message channel open for the async response
    }
});