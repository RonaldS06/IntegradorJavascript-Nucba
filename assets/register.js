const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");

const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const phoneInput = document.getElementById("phone");
//Ls
const users = JSON.parse(localStorage.getItem("users")) || [];
const saveUsers = () => {
    localStorage.setItem("users", JSON.stringify(users));
}

//------------Fn Aux-------------
const isEmpty = (input) => {
    // falsy...null
    return !input.value.trim().length;
}

//Error-
const verError = (input, message) => {
    const formField = input.parentElement;

    formField.classList.remove("successForm")
    formField.classList.add("errorForm")

    const error = formField.querySelector("small")
    error.style.display = "block";

    error.textContent = message;
}

const isBetween = (input, min, max) => {
    return input.value.trim().length >= min && input.value.trim().length <= max;
}

//Success-
const verSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove("errorForm");
    formField.classList.add("succesForm");

    const error = formField.querySelector("small")
    error.textContent = ""; //Vacio
}

//Mail Válido
const isMailValid = (input) => {
    const regularExp = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    //Tester
    return regularExp.test(input.value.trim())
}

//Mail Existe
const isMailExisting = (input) => {
    return users.some((user) => user.email === input.value.trim());
}

//Contraseña segura
const isPassSecure = (input) => {
    const regularExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,25}$/;
    //tester
    return regularExp.test(input.value.trim());
}

//Telefono válido
const isPhoneValid = (input) => {
    const regularExp = /^[0-9]{10}$/;
    // tester
    return regularExp.test(input.value.trim());
}

//--------Fn val input TEXT (name, apellid)-----
const checkTextInput = (input) => {
    //set en false
    let valid = false;

    const minCharacters = 3;
    const maxCharacters = 20;

    //input vacio
    if (isEmpty(input)) {
        verError(input, "Este campo es obligatorio");
        return;
    };

    //cantidad characters
    if (!isBetween(input, minCharacters, maxCharacters)) {
        verError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} carácteres`)
        return;
    }

    //else
    verSuccess(input)
    valid = true;
    return valid
}

// -------- fn val input EMAIL -------
const checkEmailInput = (input) => {
    // set en false
    let valid = false;

    if (isEmpty(input)) {
        verError(input, 'El email es obligatorio');
        return;
    }
    //comprobar si es valido
    if (!isMailValid(input)) {
        verError(input, 'El email no es válido');
        return;
    }
    //comprobar si existe
    if (isMailExisting(input)) {
        verError(input, 'El mail ya se encuentra registrado');
        return;
    }

    //else
    verSuccess(input);
    valid = true;
    return valid;
}

// -------- fn val input PASSWORD -------
const checkPasswordInput = (input) => {
    //set en false
    let valid = false;

    if (isEmpty(input)) {
        verError(input, 'La contraseña es obligatoria');
        return;
    }

    //contraseña segura
    if (!isPassSecure(input)) {
        verError(input, 'La contraseña debe tener al menos 8 carácter, una mayúscula, una minúscula y un símbolo');
        return;
    };

    verSuccess(input);
    valid = true;
    return valid;
}
// -------- fn val input PHONE -------
const checkPhoneInput = (input) => {
    //set en false
    let valid = false

    if (isEmpty(input)) {
        verError(input, 'El número de teléfono es obligatorio');
        return;
    }
    if (!isPhoneValid(input)) {
        verError(input, 'El número de teléfono no es válido');
        return;
    }

    verSuccess(input);
    valid = true;
    return valid;
}

//Validacion Gral y Ls
const validarForm = (e) => {
    //Evitar comp por defecto
    e.preventDefault();
    //Check input válidos
    let NameValid = checkTextInput(nameInput);
    let LastNameValid = checkTextInput(lastNameInput);
    let MailValid = checkEmailInput(emailInput);
    let PasswordValid = checkPasswordInput(passwordInput);
    let PhoneValid = checkPhoneInput(phoneInput);

    //Agrupar
    let formValid = NameValid && LastNameValid && MailValid && PasswordValid && PhoneValid;

    //save Data
    if (formValid) {
        users.push({
            name: nameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            phone: phoneInput.value,
        });

        //Guardar en LS
        saveUsers(users);
        alert('Te has registrado con éxito');
        window.location.href = "login.html";
    }
};


//Fn Init
const init = () => {
    registerForm.addEventListener("submit", validarForm);
    //Valid c/campo x evento
    nameInput.addEventListener("input", () => {
        checkTextInput(nameInput)
    })
    lastNameInput.addEventListener("input", () => {
        checkTextInput(lastNameInput)
    })

    emailInput.addEventListener("input", () => {
        checkEmailInput(emailInput)
    })
    passwordInput.addEventListener("input", () => {
        checkPasswordInput(passwordInput);
    })
    phoneInput.addEventListener("input", () => {
        checkPhoneInput(phoneInput)
    })
}

init();