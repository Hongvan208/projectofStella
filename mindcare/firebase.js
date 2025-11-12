const firebaseConfig = {
};


// Firebase v9 modular (CDN) - đặt script tag hoặc import theo need
// Ví dụ sử dụng CDN trong project tĩnh: include
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>


// Dưới đây là guide dùng compat build cho file tĩnh
if (typeof firebase !== 'undefined') {
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// Auth UI
const loginBtn = document.getElementById('login-btn');
if (loginBtn) loginBtn.addEventListener('click', () => {
const provider = new firebase.auth.GoogleAuthProvider();
auth.signInWithPopup(provider).catch(e => alert(e.message));
});


auth.onAuthStateChanged(user => {
document.querySelectorAll('#auth-area, #auth-area-2, #auth-area-3, #auth-area-4, #auth-area-5').forEach(el => {
if (!el) return;
el.innerHTML = user ? `<div class="user">Xin chào ${user.displayName || 'Khách'} <button id=logout class='btn outline small'>Đăng xuất</button></div>` : `<button id=login class='btn'>Đăng nhập</button>`;
});


const logout = document.getElementById('logout');
if (logout) logout.addEventListener('click', () => auth.signOut());
const login = document.getElementById('login');
if (login) login.addEventListener('click', () => {
const provider = new firebase.auth.GoogleAuthProvider();
auth.signInWithPopup(provider);
});
});


// Share: load posts
const postsRoot = document.getElementById('posts-root');
if (postsRoot) {
db.collection('posts').orderBy('timestamp','desc').onSnapshot(snap => {
postsRoot.innerHTML = '';
snap.forEach(doc => {
const d = doc.data();
const div = document.createElement('div'); div.className='post'; div.textContent = d.text; postsRoot.appendChild(div);
});
});


const shareBtn = document.getElementById('share-btn');
if (shareBtn) shareBtn.addEventListener('click', async () => {
const input = document.getElementById('share-input');
if (!input.value.trim()) return;
await db.collection('posts').add({ text: input.value.trim(), timestamp: Date.now() });
input.value='';
});
}


// Journal (optional) similar approach: collection 'journals'
}