document.getElementById("sendButton").addEventListener("click", () => {
    let phoneNumber = document.getElementById("phoneNumber").value.trim();
    let fileInput = document.getElementById("fileInput").files[0];

    if (!phoneNumber || !fileInput) {
        alert("Please enter a phone number and select a file.");
        return;
    }

    // Read the file as a data URL
    let reader = new FileReader();
    reader.onload = function(event) {
        let fileData = event.target.result;

        chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, (tabs) => {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: sendFileToWhatsApp,
                    args: [phoneNumber, fileData, fileInput.name]
                });
            } else {
                alert("Open WhatsApp Web first.");
            }
        });
    };
    reader.readAsDataURL(fileInput);
});

// Function to be injected into WhatsApp Web
function sendFileToWhatsApp(phoneNumber, fileData, fileName) {
    let url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
    window.location.href = url;

    setTimeout(() => {
        let inputField = document.querySelector("footer div[contenteditable]");
        if (inputField) {
            inputField.focus();
            document.execCommand("insertText", false, "Sending file...");
            inputField.dispatchEvent(new Event("input", { bubbles: true }));

            setTimeout(() => {
                let sendButton = document.querySelector("footer button");
                if (sendButton) {
                    sendButton.click();
                }
            }, 500);
        }
    }, 3000);
}