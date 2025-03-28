/**
 * Debug helper script for WhatsApp Web extension
 * This script helps identify issues with the WPP object and chat access
 */

(function() {
    console.log('Debug script loaded');

    // Check if WPP object is available
    const checkWPP = () => {
        try {
            if (typeof window.WPP !== 'undefined' && window.WPP !== null) {
                console.log('WPP object found:', Object.keys(window.WPP));

                // Check chat module
                if (window.WPP.chat) {
                    console.log('WPP.chat methods:', Object.keys(window.WPP.chat));
                } else {
                    console.error('WPP.chat module not found');
                }

                // Check contact method
                if (window.WPP.contact) {
                    console.log('WPP.contact methods:', Object.keys(window.WPP.contact));
                }

                // Check WhatsApp store
                if (window.WPP.whatsapp && window.WPP.whatsapp.ChatStore) {
                    console.log('ChatStore found with models:', window.WPP.whatsapp.ChatStore._models.length);
                } else {
                    console.error('ChatStore not found or empty');
                }
            } else {
                console.error('WPP object not available');
                setTimeout(checkWPP, 2000);
            }
        } catch (error) {
            console.error('Error checking WPP:', error);
        }
    };

    // Register an event handler for our sendAttachment events
    window.addEventListener('message', event => {
        if (event.source === window &&
            event.data.type === 'FROM_CONTENT_SCRIPT' &&
            event.data.message &&
            event.data.message.request === 'sendAttachment') {

            console.log('Received sendAttachment request');

            // Log attachment details
            const attachment = event.data.message.attachment;
            const number = event.data.message.number;

            console.log('Target phone:', number);
            console.log('Attachment fileType:', attachment.fileType);
            console.log('Attachment fileName:', attachment.fileName);
            console.log('Attachment fileCaption:', attachment.fileCaption);

            // Check if chat exists for this number
            setTimeout(async() => {
                try {
                    const chatId = number + '@c.us';

                    // If WPP is available check chat
                    if (window.WPP && window.WPP.whatsapp && window.WPP.whatsapp.ChatStore) {
                        const chat = window.WPP.whatsapp.ChatStore.get(chatId);

                        if (chat) {
                            console.log('Chat found for:', chatId);
                        } else {
                            console.error('Chat NOT found for:', chatId);

                            // Try to force create chat
                            try {
                                if (window.WPP.chat.getChat) {
                                    console.log('Attempting to create chat');
                                    await window.WPP.chat.getChat(chatId);
                                    console.log('Chat creation attempted');
                                }
                            } catch (chatErr) {
                                console.error('Error creating chat:', chatErr);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error checking chat:', error);
                }
            }, 2000);
        }
    });

    // Run the check after a delay to ensure WhatsApp is loaded
    setTimeout(checkWPP, 5000);
})();