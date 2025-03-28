// WhatsApp Message Sender - Popup Script
document.addEventListener('DOMContentLoaded', async function() {
    // UI Elements
    const sendTextBtn = document.getElementById('sendTextBtn');
    const sendImageBtn = document.getElementById('sendImageBtn');
    const statusText = document.getElementById('status');
    const fileInput = document.getElementById('fileInput');
    const selectedFileName = document.getElementById('selectedFileName');
    const captionInput = document.getElementById('caption');
    const numberInput = document.getElementById('number');

    // Track the selected file
    let selectedFile = null;

    // Check WhatsApp connection
    checkWhatsAppConnection();

    // File selection handling
    fileInput.addEventListener('change', handleFileSelection);

    // Button click handlers
    sendTextBtn.addEventListener('click', sendTextMessage);
    sendImageBtn.addEventListener('click', sendImageMessage);

    // Check if WhatsApp Web is open and connected
    async function checkWhatsAppConnection() {
        const tabs = await chrome.tabs.query({ url: 'https://web.whatsapp.com/*' });

        if (tabs.length === 0) {
            statusText.textContent = 'Please open WhatsApp Web first';
            disableButtons();

            // Open WhatsApp Web in a new tab
            const openWhatsAppBtn = document.createElement('button');
            openWhatsAppBtn.textContent = 'Open WhatsApp Web';
            openWhatsAppBtn.className = 'button';
            openWhatsAppBtn.onclick = () => {
                chrome.tabs.create({ url: 'https://web.whatsapp.com/' });
                window.close();
            };

            document.getElementById('buttonContainer').appendChild(openWhatsAppBtn);
            return false;
        }

        // Check if logged in
        try {
            const response = await chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello' });

            if (response && response.number) {
                statusText.textContent = `Connected as: ${response.number}`;
                enableButtons();
                return true;
            } else {
                statusText.textContent = 'Please log in to WhatsApp Web';
                disableButtons();
                return false;
            }
        } catch (error) {
            statusText.textContent = 'Error connecting to WhatsApp Web';
            disableButtons();
            return false;
        }
    }

    // Handle file selection
    function handleFileSelection(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (max 16MB for WhatsApp)
        if (file.size > 16 * 1024 * 1024) {
            statusText.textContent = 'File too large (max 16MB)';
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
        const number = numberInput.value.trim();
        if (!number) {
            statusText.textContent = 'Please enter a phone number';
            return;
        }

        disableButtons();
        statusText.textContent = 'Sending message...';

        try {
            const tabs = await chrome.tabs.query({ url: 'https://web.whatsapp.com/*' });
            if (tabs.length === 0) {
                throw new Error('WhatsApp Web is not open');
            }

            const result = await chrome.tabs.sendMessage(tabs[0].id, {
                action: 'sendText',
                number: number,
                text: 'Hi'
            });

            statusText.textContent = result.success ? 'Message sent successfully' : 'Failed to send message';
        } catch (error) {
            statusText.textContent = `Error: ${error.message}`;
        } finally {
            enableButtons();
        }
    }

    // Send image message
    async function sendImageMessage() {
        const number = numberInput.value.trim();
        if (!number || !selectedFile) {
            statusText.textContent = 'Please enter a phone number and select an image';
            return;
        }

        disableButtons();
        statusText.textContent = 'Processing image...';

        try {
            // Convert file to base64
            const fileData = await readFileAsDataURL(selectedFile);
            console.log(`File converted to base64, size: ${Math.round(fileData.length/1024)} KB`);

            // Prepare attachment object exactly as working extension expects
            const attachment = {
                fileName: selectedFile.name,
                fileType: selectedFile.type,
                fileData: JSON.stringify(fileData),
                fileCaption: captionInput.value || '',
                fileAddTimeStamp: true
            };

            statusText.textContent = 'Sending image...';

            // Send message to content script
            const tabs = await chrome.tabs.query({ url: 'https://web.whatsapp.com/*' });
            if (tabs.length === 0) {
                throw new Error('WhatsApp Web is not open');
            }

            const result = await chrome.tabs.sendMessage(tabs[0].id, {
                action: 'sendImage',
                number: number,
                attachment: attachment
            });

            statusText.textContent = result.success ? 'Image sent successfully' : 'Failed to send image';
        } catch (error) {
            statusText.textContent = `Error: ${error.message}`;
            console.error('Error sending image:', error);
        } finally {
            enableButtons();
        }
    }

    // Enable all buttons
    function enableButtons() {
        sendTextBtn.disabled = false;

        // Only enable image button if file is selected and number is entered
        sendImageBtn.disabled = !(selectedFile && numberInput.value);
    }

    // Disable all buttons
    function disableButtons() {
        sendTextBtn.disabled = true;
        sendImageBtn.disabled = true;
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