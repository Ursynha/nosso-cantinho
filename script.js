// DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginCard = document.getElementById('loginCard');
const blogContent = document.getElementById('blogContent');
const loginError = document.getElementById('loginError');

const postForm = document.getElementById('postForm');
const contentInput = document.getElementById('contentInput');
const postsContainer = document.getElementById('postsContainer');
const emptyState = document.getElementById('emptyState');
const logoutBtn = document.getElementById('logoutBtn');

let userUid = null;

// LOGIN
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.classList.add('hidden');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value);
    userUid = userCredential.user.uid;
    console.log("Login bem-sucedido!", userUid);
  } catch (err) {
    console.error("Erro de login:", err.code, err.message);
    loginError.classList.remove('hidden');
  }
});

// Verifica se usuário está logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    userUid = user.uid;
    loginCard.classList.add('hidden');
    blogContent.classList.remove('hidden');
    initPosts();
  } else {
    loginCard.classList.remove('hidden');
    blogContent.classList.add('hidden');
  }
});

// LOGOUT
logoutBtn.addEventListener('click', () => {
  signOut(auth);
});

// POSTS
function initPosts() {
  const postsRef = ref(database, 'posts');

  onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    renderPosts(data);
  });
}

postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = contentInput.value.trim();
  if (!content) return;

  const postsRef = ref(database, 'posts');
  push(postsRef, {
    uid: userUid,
    content: content,
    date: new Date().toLocaleString()
  });

  postForm.reset();
});

function renderPosts(data) {
  if (!data) {
    postsContainer.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  const postsArray = Object.values(data).reverse();
  postsContainer.innerHTML = postsArray
    .map(post => `<div class="post-card"><p>${post.content}</p><span>${post.date}</span></div>`)
    .join('');
}
