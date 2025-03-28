// WhatsApp Message Sender - Popup Script
document.addEventListener('DOMContentLoaded', function() {
    // UI Elements
    const sendTextBtn = document.getElementById('sendTextBtn');
    const sendImageBtn = document.getElementById('sendImageBtn');
    const textStatus = document.getElementById('textStatus');
    const imageStatus = document.getElementById('imageStatus');
    const fileInput = document.getElementById('fileInput');
    const selectedFileName = document.getElementById('selectedFileName');
    const captionInput = document.getElementById('caption');
    const numberInput = document.getElementById('number');
    const checkConnectionBtn = document.getElementById('checkConnectionBtn');
    const openWhatsAppBtn = document.getElementById('openWhatsAppBtn');

    // Track the selected file
    let selectedFile = null;

    // Phone number hardcoded for testing
    const testNumber = '918287066456';

    // Ensure all buttons are enabled
    sendTextBtn.disabled = false;
    sendImageBtn.disabled = false;

    // File selection handling
    fileInput.addEventListener('change', handleFileSelection);

    // Button click handlers
    sendTextBtn.addEventListener('click', sendTextMessage);
    sendImageBtn.addEventListener('click', sendImageMessage);

    // Add click handlers for diagnostic buttons
    checkConnectionBtn.addEventListener('click', checkWhatsAppConnection);
    openWhatsAppBtn.addEventListener('click', function() {
        chrome.tabs.create({ url: 'https://web.whatsapp.com/' });
    });

    // Check if WhatsApp Web is open and connected
    async function checkWhatsAppConnection() {
        textStatus.textContent = 'Checking connection...';
        sendTextBtn.disabled = true;
        sendImageBtn.disabled = true;

        try {
            const tabs = await chrome.tabs.query({ url: 'https://web.whatsapp.com/*' });

            if (tabs.length === 0) {
                textStatus.textContent = 'WhatsApp Web is not open';
                return;
            }

            textStatus.textContent = 'WhatsApp Web is open, checking login status...';

            // Try to get connection status
            try {
                // First try to execute a script to check if WhatsApp is loaded
                const isLoaded = await chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: () => {
                        return document.getElementsByClassName('app').length > 0 ||
                            document.querySelector('div[data-testid="chat-list"]') !== null;
                    }
                });

                if (!isLoaded[0].result) {
                    textStatus.textContent = 'WhatsApp Web is still loading...';
                    return;
                }

                // If loaded, try to get the user's phone number
                const response = await chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello' });

                if (response && response.number) {
                    textStatus.textContent = `Connected as: ${response.number}`;
                    sendTextBtn.disabled = false;
                    sendImageBtn.disabled = false;
                } else {
                    textStatus.textContent = 'Not logged into WhatsApp Web';
                }
            } catch (error) {
                console.error('Error checking WhatsApp login:', error);
                textStatus.textContent = 'Error checking login status. Try refreshing WhatsApp Web.';
            }
        } catch (error) {
            console.error('Error in checkWhatsAppConnection:', error);
            textStatus.textContent = 'Error checking WhatsApp Web connection';
        }
    }

    // Handle file selection
    function handleFileSelection(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (max 16MB for WhatsApp)
        if (file.size > 16 * 1024 * 1024) {
            textStatus.textContent = 'File too large (max 16MB)';
            fileInput.value = '';
            selectedFileName.textContent = '';
            selectedFile = null;
            return;
        }

        // Update UI
        selectedFileName.textContent = file.name;
        selectedFile = file;

        // Enable send image button
        if (selectedFile && numberInput.value) {
            sendImageBtn.disabled = false;
        }
    }

    // Convert file to base64
    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Send text message
    async function sendTextMessage() {
        textStatus.textContent = 'Sending...';
        sendTextBtn.disabled = true;

        // Ensure WhatsApp Web is open first
        chrome.runtime.sendMessage({ action: "openWhatsAppWeb" }, function(response) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "openChat",
                    number: testNumber,
                    message: "Hi"
                }, function(response) {
                    console.log("Response from content script:", response);
                    if (response && response.status) {
                        textStatus.textContent = 'Opening chat and sending message...';

                        // Re-enable button after delay to allow time for sending
                        setTimeout(() => {
                            textStatus.textContent = 'Message sent!';
                            sendTextBtn.disabled = false;
                        }, 3000);
                    } else {
                        textStatus.textContent = 'Error: Is WhatsApp Web open?';
                        sendTextBtn.disabled = false;
                    }
                });
            });
        });
    }

    // Send image message
    async function sendImageMessage() {
        imageStatus.textContent = 'Preparing to send...';
        sendImageBtn.disabled = true;

        // Read the file as base64
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = function(event) {
            const file = event.target.files[0];
            if (!file) {
                imageStatus.textContent = 'No file selected';
                sendImageBtn.disabled = false;
                return;
            }

            imageStatus.textContent = 'Reading file...';
            console.log('Selected file:', {
                name: file.name,
                size: file.size,
                type: file.type
            });

            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Data = e.target.result.split(',')[1]; // Remove data URL prefix
                console.log('File read successfully, base64 length:', base64Data.length);

                // Prepare attachment in the format expected by our implementation
                const attachment = {
                    fileName: file.name,
                    fileType: file.type,
                    fileData: base64Data,
                    fileCaption: "Test image caption"
                };

                imageStatus.textContent = 'Opening WhatsApp Web...';

                // Ensure WhatsApp Web is open first
                chrome.runtime.sendMessage({ action: "openWhatsAppWeb" }, function(response) {
                    if (response && response.success) {
                        const tabId = response.tabId;
                        // Wait a bit for WhatsApp to load if it was just opened
                        setTimeout(() => {
                            imageStatus.textContent = 'Opening chat...';

                            // Send message to WhatsApp tab
                            chrome.tabs.sendMessage(tabId, {
                                action: "openChat",
                                number: testNumber,
                                attachment: attachment
                            }, function(response) {
                                console.log("Response from content script:", response);

                                if (response && response.status) {
                                    imageStatus.textContent = 'Image being sent to WhatsApp...';

                                    // Re-enable after a delay to allow time for sending
                                    setTimeout(() => {
                                        imageStatus.textContent = 'Image sent to WhatsApp!';
                                        sendImageBtn.disabled = false;
                                    }, 5000);
                                } else {
                                    imageStatus.textContent = 'Error: Check console logs';
                                    sendImageBtn.disabled = false;
                                }
                            });
                        }, 2000);
                    } else {
                        imageStatus.textContent = 'Error opening WhatsApp Web';
                        sendImageBtn.disabled = false;
                    }
                });
            };

            reader.onerror = function(error) {
                console.error('Error reading file:', error);
                imageStatus.textContent = 'Error reading file';
                sendImageBtn.disabled = false;
            };

            reader.readAsDataURL(file);
        };

        fileInput.click();
    }

    // Update button state when number changes
    numberInput.addEventListener('input', function() {
        if (this.value && selectedFile) {
            sendImageBtn.disabled = false;
        } else {
            sendImageBtn.disabled = true;
        }
    });
});