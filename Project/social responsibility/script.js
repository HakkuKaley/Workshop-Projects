document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postTitle = document.getElementById('postTitle');
    const postDescription = document.getElementById('postDescription');
    const postsList = document.getElementById('postsList');
    const loading = document.getElementById('loading');
  
    // API URLs
    const postsApiUrl = 'https://dummyjson.com/posts';
    const todosApiUrl = 'https://dummyjson.com/todos';
    const commentsApiUrl = 'https://dummyjson.com/comments';
  
    // Fetch and Display Posts
    async function fetchPosts() {
      loading.style.display = 'block';
      const response = await fetch(postsApiUrl);
      const data = await response.json();
      const posts = data.posts;
  
      postsList.innerHTML = '';
  
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('card', 'mb-3');
        postElement.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <h6>Assigned Tasks</h6>
            <div class="list-group" id="todo-list-${post.id}">
              <!-- Tasks will appear here -->
            </div>
            <h6>Comments</h6>
            <div class="list-group" id="comment-list-${post.id}">
              <!-- Comments will appear here -->
            </div>
          </div>
          <div class="card-footer text-end">
            <button class="btn btn-outline-primary btn-sm" id="view-tasks-${post.id}">View Tasks</button>
            <button class="btn btn-outline-secondary btn-sm" id="add-comment-${post.id}">Add Comment</button>
          </div>
        `;
  
        postsList.appendChild(postElement);
  
        // Fetch Tasks for this Post
        fetchTasks(post.id);
        // Fetch Comments for this Post
        fetchComments(post.id);
  
        // Attach event listeners to buttons
        document.getElementById(`view-tasks-${post.id}`).addEventListener('click', () => viewTasks(post.id));
        document.getElementById(`add-comment-${post.id}`).addEventListener('click', () => addComment(post.id));
      });
  
      loading.style.display = 'none';
    }
  
    // Fetch Tasks for a Post
    async function fetchTasks(postId) {
      const response = await fetch(todosApiUrl);
      const data = await response.json();
      const tasks = data.todos.filter(todo => todo.userId === postId);
  
      const todoList = document.getElementById(`todo-list-${postId}`);
      tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('list-group-item');
        taskElement.innerHTML = `
          <div class="d-flex justify-content-between">
            <span>${task.todo}</span>
            <span class="badge ${task.completed ? 'bg-success' : 'bg-warning'}">${task.completed ? 'Completed' : 'Pending'}</span>
          </div>
        `;
        todoList.appendChild(taskElement);
      });
    }
  
    // Fetch Comments for a Post
    async function fetchComments(postId) {
      const response = await fetch(commentsApiUrl);
      const data = await response.json();
      const comments = data.comments.filter(comment => comment.postId === postId);
  
      const commentList = document.getElementById(`comment-list-${postId}`);
      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('list-group-item');
        commentElement.innerHTML = `
          <strong>${comment.name}</strong>: ${comment.body}
        `;
        commentList.appendChild(commentElement);
      });
    }
  
    // View Tasks Functionality
    function viewTasks(postId) {
      const todoList = document.getElementById(`todo-list-${postId}`);
      todoList.style.display = todoList.style.display === 'none' ? 'block' : 'none';
    }
  
    // Add Comment Functionality
    async function addComment(postId) {
      const commentText = prompt('Enter your comment:');
      if (commentText) {
        const newComment = {
          postId: postId,
          name: 'Anonymous', // You can modify this with actual user data if available
          body: commentText,
        };
  
        const response = await fetch(commentsApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });
  
        const data = await response.json();
        fetchPosts(); // Refresh the posts after a new comment is added
      }
    }
  
    // Handle Post Form Submission
    postForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const newPost = {
        title: postTitle.value,
        body: postDescription.value,
      };
  
      const response = await fetch(postsApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
  
      const data = await response.json();
      fetchPosts(); // Refresh the posts after new one is added
  
      // Clear the form
      postTitle.value = '';
      postDescription.value = '';
    });
  
    // Initial Load
    fetchPosts();
  });
  