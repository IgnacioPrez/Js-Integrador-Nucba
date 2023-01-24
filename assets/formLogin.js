const formLogin = document.getElementById("form-login");
const inputEmailLogin = document.getElementById("email-login");
const inputPasswordLogin = document.getElementById("password-login");

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

const user = JSON.parse(localStorage.getItem('user'))
const isEmpty = (value) => !value;
const isEmailValid = (email) => EMAIL_REGEX.test(email);
const isPasswordValid = (password) => PASSWORD_REGEX.test(password);

const viewError = (input, message) => {
  const formCont = input.parentElement;
  formCont.classList.remove("succes");
  formCont.classList.add("error");
  const errorContainer = formCont.querySelector("small");
  errorContainer.textContent = message;
};

const viewSucces = (input) => {
  const formCont = input.parentElement;
  formCont.classList.add("succes");
  formCont.classList.remove("error");
  const errorContainer = formCont.querySelector("small");
  errorContainer.textContent = "";
};

const loginEmailValidate = () => {
    let valid = false;
    const email = inputEmailLogin.value.trim();
    if (isEmpty(email)) {
      viewError(inputEmailLogin, "El correo es obligatorio");
    } else if (!isEmailValid(email) && email !== user.email) {
      viewError(inputEmailLogin, `El correo es incorrecto`);
    } else {
      viewSucces(inputEmailLogin);
      valid = true;
    }
    return valid;
  };
  
const loginPasswordValidate = () => {
    let valid = false;
    const password = inputPasswordLogin.value.trim();
    if (isEmpty(password)) {
      viewError(inputPasswordLogin, "El correo es obligatorio");
    } else if (!isEmailValid(password) && password !== user.password) {
      viewError(inputPasswordLogin, `Contraseña invalida`);
    } else {
      viewSucces(inputPasswordLogin);
      valid = true;
    }
    return valid;
  };

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const passwordValid = loginPasswordValidate();
    const emailValid = loginEmailValidate();
    const isFormValid = passwordValid && emailValid;
    if(isFormValid){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Iniciado correctamente',
            showConfirmButton: false,
            timer: 1500
          })

        setTimeout(function () {
            window.location.href="../index.html";
          }, 1700);
    }
  });