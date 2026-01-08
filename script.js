// DOM
const postForm = document.getElementById('postForm');
const authorInput = document.getElementById('authorInput');
const contentInput = document.getElementById('contentInput');
const postsContainer = document.getElementById('postsContainer');
const emptyState = document.getElementById('emptyState');

// Inicializar posts
function initPosts() {
  const postsRef = ref(database, 'posts');

  onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    renderPosts(data);
  });
}

// Enviar novo post
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const author = authorInput.value.trim();
  const content = contentInput.value.trim();
  if (!author || !content) return;

  const postsRef = ref(database, 'posts');
  push(postsRef, {
    author: author,
    content: content,
    date: new Date().toLocaleString()
  });

  postForm.reset();
});

// Renderizar posts
function renderPosts(data) {
  if (!data) {
    postsContainer.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  const postsArray = Object.values(data).reverse();
  postsContainer.innerHTML = postsArray
    .map(post => `
      <div class="post-card">
        <h3>${post.author}</h3>
        <p>${post.content}</p>
        <span>${post.date}</span>
      </div>
    `)
    .join('');
}

// Inicializar
initPosts();
