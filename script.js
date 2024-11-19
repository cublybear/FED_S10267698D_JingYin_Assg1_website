const account = document.querySelector('.account');
const signinlink = document.querySelector('.signin-link');
const signuplink = document.querySelector('.signup-link');

signinlink.addEventListener('click', ()=> {
    account.classList.add('active');
});

signuplink.addEventListener('click', ()=> {
    account.classList.add('remove');
});