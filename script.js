// Initial posts data
let posts = [

];

// DOM Elements
const postForm = document.getElementById('postForm');
const authorInput = document.getElementById('authorInput');
const contentInput = document.getElementById('contentInput');
const imageInput = document.getElementById('imageInput');
const expandedForm = document.getElementById('expandedForm');
const cancelBtn = document.getElementById('cancelBtn');
const postsContainer = document.getElementById('postsContainer');
const emptyState = document.getElementById('emptyState');

// Event Listeners
authorInput.addEventListener('focus', () => {
    expandedForm.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
    expandedForm.classList.add('hidden');
    postForm.reset();
});

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleNewPost();
});

// Functions
function handleNewPost() {
    const author = authorInput.value.trim();
    const content = contentInput.value.trim();
    const image = imageInput.value.trim();

    if (!author || !content) return;

    const newPost = {
        id: Date.now().toString(),
        author: author,
        content: content,
        image: image || "",
        date: formatDate(new Date()),
        likes: 0
    };

    posts.unshift(newPost);
    renderPosts();
    
    // Reset form
    postForm.reset();
    expandedForm.classList.add('hidden');
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

function createPostHTML(post) {
    return `
        <div class="post-card" data-id="${post.id}">
            <div class="post-header">
                <div>
                    <h3 class="post-author">${post.author}</h3>
                    <p class="post-date">${post.date}</p>
                </div>
                <button class="delete-btn" onclick="deletePost('${post.id}')">
                    <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
            
            ${post.image ? `<img src="${post.image}" alt="Post" class="post-image">` : ''}
            
            <p class="post-content">${post.content}</p>
            
            <div class="post-actions">
                <button class="action-btn like-btn" onclick="likePost('${post.id}')">
                    <svg class="icon-small like-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>${post.likes}</span>
                </button>
                <button class="action-btn comment-btn">
                    <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Comentar</span>
                </button>
            </div>
        </div>
    `;
}

function renderPosts() {
    if (posts.length === 0) {
        postsContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    postsContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    postsContainer.innerHTML = posts.map(post => createPostHTML(post)).join('');
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        renderPosts();
    }
}

function deletePost(postId) {
    posts = posts.filter(p => p.id !== postId);
    renderPosts();
}

// Initial render
renderPosts();