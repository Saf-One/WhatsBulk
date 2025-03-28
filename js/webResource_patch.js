/**
 * Simplified WebResource Script for WhatsApp Web
 * Direct implementation of the exact approach that worked previously
 */

(() => {
    console.log('Simplified WebResource script loaded');

    class WebResourceCommunicator {
        constructor() {
            console.log('WebResourceCommunicator initialized');
            this.init();
        }

        init() {
            this.listenForMessages();
            this.waitForWPP();
        }

        // Wait for WPP object to be available
        waitForWPP() {
            const checkWPP = () => {
                if (window.WPP) {
                    console.log('WPP object is available:', Object.keys(window.WPP));

                    // Check for chat module
                    if (window.WPP.chat) {
                        console.log('Chat module available with methods:', Object.keys(window.WPP.chat));
                    } else {
                        console.warn('Chat module not yet available');
                    }
                } else {
                    console.log('WPP object not yet available, retrying...');
                    setTimeout(checkWPP, 1000);
                }
            };
            checkWPP();
        }

        // Create a chat if it doesn't exist
        async ensureChatExists(chatId) {
            try {
                if (!window.WPP || !window.WPP.chat) {
                    console.error('WPP or WPP.chat not available');
                    return false;
                }

                console.log('Checking if chat exists for:', chatId);

                // Try different methods to ensure chat exists
                if (window.WPP.chat.getChat) {
                    const chat = await window.WPP.chat.getChat(chatId);
                    console.log('Chat found or created:', chat ? .id ? .user);
                    return true;
                } else if (window.WPP.whatsapp && window.WPP.whatsapp.ChatStore) {
                    // First check if chat exists in store
                    const existingChat = window.WPP.whatsapp.ChatStore.get(chatId);
                    if (existingChat) {
                        console.log('Chat found in ChatStore');
                        return true;
                    }

                    // If not in store, try to find create method
                    if (window.WPP.whatsapp.ChatStore.find) {
                        await window.WPP.whatsapp.ChatStore.find(chatId);
                        console.log('Chat searched in ChatStore');
                        return true;
                    }
                }

                console.warn('Could not definitively create chat');
                return false;
            } catch (error) {
                console.error('Error ensuring chat exists:', error);
                return false;
            }
        }

        async sendAttachment(data) {
            console.log('sendAttachment called with data:', {
                number: data.number,
                fileName: data.attachment.fileName,
                fileType: data.attachment.fileType,
                hasCaption: !!data.attachment.fileCaption,
                fileDataLength: data.attachment.fileData.length
            });

            try {
                // Format chatId exactly as in working extension
                const chatId = data.number + "@c.us";
                console.log('Target chatId:', chatId);

                // Ensure chat exists before sending
                await this.ensureChatExists(chatId);

                // Get file data and caption
                const fileData = data.attachment.fileData;
                let caption = data.attachment.fileCaption || '';
                caption = caption.trim();

                // Create a Blob from the base64 data
                const byteCharacters = atob(fileData);
                const byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }

                const blob = new Blob(byteArrays, { type: data.attachment.fileType });
                console.log('Created blob:', {
                    size: blob.size,
                    type: blob.type
                });

                // Make sure WPP is available
                if (!window.WPP || !window.WPP.chat) {
                    throw new Error('WPP object or chat module not available');
                }

                // This is the exact call that worked in the working extension
                console.log('Calling WPP.chat.sendFileMessage with:', {
                    chatId,
                    hasBlob: !!blob,
                    blobSize: blob.size,
                    blobType: blob.type,
                    hasCaption: !!caption,
                    fileName: data.attachment.fileName
                });

                // Attempt send with fallback options
                try {
                    await window.WPP.chat.sendFileMessage(chatId, blob, {
                        type: "auto-detect",
                        caption: caption || undefined,
                        filename: data.attachment.fileName
                    });
                } catch (firstError) {
                    console.warn('First attempt failed, trying alternate method:', firstError);

                    // Try alternate method
                    if (window.WPP.chat.sendMediaMessage) {
                        await window.WPP.chat.sendMediaMessage(chatId, blob, {
                            caption: caption
                        });
                    } else {
                        throw firstError;
                    }
                }

                // Trigger the success event
                console.log('File sent successfully!');

                // Dispatch both event types for compatibility
                window.dispatchEvent(new CustomEvent("wam:attachments-sent"));
                window.postMessage({
                    type: 'attachment_status',
                    status: 'success'
                }, '*');

            } catch (error) {
                console.error('Error sending attachment:', error);

                // Dispatch both error event types
                window.dispatchEvent(new CustomEvent("wam:attachments-sent", {
                    detail: { success: false, error: error.message }
                }));
                window.postMessage({
                    type: 'attachment_status',
                    status: 'error',
                    error: error.message
                }, '*');
            }
        }

        listenForMessages() {
            window.addEventListener("message", (event) => {
                // Only process messages from our content script
                if (event.source === window && event.data.type === "FROM_CONTENT_SCRIPT") {
                    const messageData = event.data.message;

                    // Handle sendAttachment request
                    if (messageData && messageData.request === "sendAttachment") {
                        console.log('Received sendAttachment request');
                        this.sendAttachment(messageData);
                    }
                }
            });
        }
    }

    // Create an instance
    window.contentComm = new WebResourceCommunicator();
})();