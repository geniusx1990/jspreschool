const loginButton = document.querySelector('.login-open-pop-up')
const popUp = document.querySelector('.pop-up_conent');
const popUp2 = document.querySelector('.pop-up');
const registerLink = document.querySelector('.register-link-link');
const test = document.querySelector('.text2');
const accountButton = document.querySelector('.account')


loginButton.addEventListener('click', () => {
    popUp2.classList.toggle('hidden');
    popUp.style.transform = `translateY(${0}%)`;
});

const handleClick = (event) => {
    document.querySelector('.pop-up_text').innerHTML = "Create account";
    document.querySelector('.sign-via-facebook').style.display = 'none';
    document.querySelector('.sign-via-google').style.display = 'none';
    document.querySelector('.restorepassword-link').style.display = 'none';
    document.querySelector('.popup_lines').style.display = 'none';
    document.querySelector('.pop-up_conent').style.height = '436px';
    document.querySelector('.text1').innerHTML = "Already have an account?&nbsp;";
    document.querySelector('.text2').innerHTML = "Log in";
    document.querySelector('.Signtext').innerHTML = "Sign Up";
    popUp.style.transition = `.${0}s`;
    test.classList.add('true');

}
const handleClick2 = (event) => {
    document.querySelector('.pop-up_text').innerHTML = "Log in to your account";
    document.querySelector('.sign-via-facebook').style.display = null;
    document.querySelector('.sign-via-google').style.display = null;
    document.querySelector('.restorepassword-link').style.display = null;
    document.querySelector('.popup_lines').style.display = null;
    document.querySelector('.pop-up_conent').style.height = null;
    document.querySelector('.text1').innerHTML = "Don’t have an account?&nbsp;";
    document.querySelector('.text2').innerHTML = "Register";
    document.querySelector('.Signtext').innerHTML = "Sign In";
    popUp.style.transition = `.${0}s`;


}


popUp2.addEventListener('click', (event) => {
    if (event.target.classList.contains('pop-up')) {
        popUp2.classList.toggle('hidden');
        popUp.style.transform = `translateY(${-120}%)`;
    }

    if (event.target.classList.contains('true')) {
        registerLink.addEventListener('click', (handleClick2))
        test.classList.remove('true');
        test.classList.add('false');

    }
});

registerLink.addEventListener('click', (handleClick))


accountButton.addEventListener('click', () => {
    popUp2.classList.toggle('hidden');
    popUp.style.transform = `translateY(${0}%)`;
});


const btnSubmit = document.querySelector('.signInbutton');
btnSubmit.addEventListener('click', () => {
    const loginInput = document.querySelector('.e-mailInput').value;
    const passwordInput = document.querySelector('.PassInput').value;
    if (loginInput.length <= 0 || passwordInput.length <= 0) {
        alert('Введите логин и пароль!')
    } else {
        alert('Login: ' + `${loginInput}` + ' ' + 'Password: ' + `${passwordInput}`);
    }
});




