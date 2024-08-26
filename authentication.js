const loginForm = document.getElementById('login-form');
const registerLink = document.getElementById('register-link');
const errorMessage = document.getElementById('error-message');

let users = [];

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    const username = prompt('Enter a username:');
    const password = prompt('Enter a password:');
    if (username && password) {
        users.push({ username, password });
        alert(`Account created successfully!`);
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('authenticated', true);
        window.location.href = 'secured.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});

if (localStorage.getItem('authenticated')) {
    window.location.href = 'secured.html';
}