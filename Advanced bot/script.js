document.addEventListener('DOMContentLoaded', function() {
    // Safe element selection with error checking
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const messageContainer = document.getElementById('message-container');
    const tabs = document.querySelectorAll('.chatbot-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Ensure all required elements exist
    if (!sendButton || !messageInput || !messageContainer) {
        console.error('One or more required elements are missing');
        return;
    }

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.style.display = 'none');

            tab.classList.add('active');
            document.getElementById(`${tabId}-tab`).style.display = 'block';
        });
    });

    // Message sending functionality
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;

        // Add user message
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('message', 'user-message');
        userMessageElement.innerHTML = `
            ${message}
            <div class="message-time">${getCurrentTime()}</div>
        `;
        messageContainer.appendChild(userMessageElement);

        // Add bot response
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('message', 'bot-message');
        botMessageElement.innerHTML = `
            ${getBotResponse(message)}
            <div class="message-time">${getCurrentTime()}</div>
        `;
        messageContainer.appendChild(botMessageElement);

        // Clear input and scroll to bottom
        messageInput.value = '';
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Simple bot response generation
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        const responses = {
            'hi': "Hello! How can I assist you today?",
            'hello': "Hi there! What can I help you with?",
            'help': "I'm here to help! Could you please provide more details about your issue?",
            'refund': "To process a refund, please provide your order number and reason for return.",
            'shipping': "Our standard shipping takes 3-5 business days. Expedited shipping is available at checkout.",
            'default': "I understand you have a question. Could you please clarify? Our support team is ready to help."
        };

        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return responses['default'];
    }

    // Get current time
    function getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Optional: Minimize and close functionality
    const minimizeBtn = document.getElementById('minimize-btn');
    const closeBtn = document.getElementById('close-btn');

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            // Implement minimize logic if needed
            console.log('Minimize clicked');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            // Implement close logic if needed
            console.log('Close clicked');
        });
    }
});