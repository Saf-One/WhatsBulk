chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendFile") {
        let phoneNumber = request.phoneNumber;
        let fileData = request.fileData;

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
});