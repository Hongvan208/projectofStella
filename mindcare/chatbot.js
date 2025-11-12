const responses = [
"Mình hiểu bạn đang buồn. Hãy thử hít sâu 5 lần nhé.",
"Bạn không một mình — mình lắng nghe bạn.",
"Dành cho bản thân một khoảng nghỉ ngắn, bạn xứng đáng được thư giãn."
];


const chatBox = document.getElementById('chat-box');
const chatSend = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');


if (chatSend) chatSend.addEventListener('click', () => {
if (!chatInput.value.trim()) return;
appendMessage('Bạn', chatInput.value);
const reply = responses[Math.floor(Math.random()*responses.length)];
setTimeout(()=> appendMessage('MindBot', reply), 600);
chatInput.value = '';
});


function appendMessage(who, text){
const p = document.createElement('div');
p.className = 'msg';
p.textContent = text;
chatBox.appendChild(p);
chatBox.scrollTop = chatBox.scrollHeight;
}