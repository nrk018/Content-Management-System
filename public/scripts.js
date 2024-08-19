// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    loadPosts();

    const postForm = document.getElementById("post-form");
    if (postForm) {
        postForm.addEventListener("submit", createPost);
    }
});

function loadPosts() {
    fetch("/api/posts")
        .then(response => response.json())
        .then(posts => {
            const postsList = document.getElementById("posts-list");
            postsList.innerHTML = '';
            posts.forEach(post => {
                const article = document.createElement("article");
                article.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
                postsList.appendChild(article);
            });
        })
        .catch(error => console.error("Error loading posts:", error));
}

function createPost(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "index.html";
            } else {
                alert("Error creating post");
            }
        })
        .catch(error => console.error("Error creating post:", error));
}