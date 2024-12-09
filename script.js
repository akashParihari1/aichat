async function sendMessage() {
  const inputField = document.getElementById('userInput');
  const chatBody = document.getElementById('chatBody');
  const userMessage = inputField.value.trim();

  if (userMessage === '') return;

  // Add user's message
  const userBubble = document.createElement('div');
  userBubble.className = 'message user';
  userBubble.textContent = userMessage;
  chatBody.appendChild(userBubble);

  // Simulate bot response
  const botBubble = document.createElement('div');
  botBubble.className = 'message bot';
  botBubble.textContent =  await getAnswers(userMessage);
  chatBody.appendChild(botBubble);

  // Scroll to the bottom
  chatBody.scrollTop = chatBody.scrollHeight;

  // Clear input
  inputField.value = '';
}

async function getAnswers(userMessage){
    const apiKey = "AIzaSyBK_oN7hdajoMrsci7nD1iRpV8V0F6PnTc"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const requestData = {
      contents: [
        {
          parts: [
            { text: `Rate this input from 0 to 10. and improve it. Only use a single paragraph : ${userMessage}` }
          ]
        }
      ]
    };
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}
