const loginForm = document.getElementById("login--form");
const emailInputLogin = document.getElementById("email");
const passwordInputLogin = document.getElementById("password");
const msgError = document.getElementById("form__error");


//Session Storage
const users = JSON.parse(localStorage.getItem("users")) || [];

const saveUserSessionStorage = (user) => {
    sessionStorage.setItem("activeUser", JSON.stringify(user));
}


const isEmpty = (input) => {
    return !input.value.trim().length;
}

const isExistingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim());
};

const isMatchingPassword = (input) => {
    const user = users.find((user) => user.email === emailInputLogin.value.trim());
    return user.password === input.value.trim();
}


const showError = (message) => {
    msgError.textContent = message;
}

const isAccountValid = () => {
    let valid = false
    if (isEmpty(emailInputLogin)) {
        showError('Por favor, complete los campos requeridos');
        return;
    };
    if (!isExistingEmail(emailInputLogin)) {
        showError('El mail ingresado es inválido');
        return;
    };


    if (isEmpty(passwordInputLogin)) {
        showError('Por favor completa el campo requerido');
        return;
    };
    if (!isMatchingPassword(passwordInputLogin)) {
        showError('Los datos ingresados son incorrectos');
        loginForm.reset();
        return;
    }

    //
    alert("Bienvenido, ya puedes comprar");
    valid = true;
    msgError.textContent = "";
    loginForm.reset;
    return valid;
}



const login = (e) => {
    e.preventDefault();
    //Si la cuenta es valida

    if (isAccountValid()) {
        //Traer el usuario que corresponde
        const user = users.find((user) => user.email === emailInputLogin.value.trim());

        //Guardar en Session Storage
        saveUserSessionStorage(user);
        //Redirigirlo al home
        window.location.href = "../index.html"
    }
}

// Fn inicializadora
const init = () => {
    loginForm.addEventListener("submit", login)
}

init();