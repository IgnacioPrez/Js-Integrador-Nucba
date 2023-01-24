const form = document.getElementById("formulario");
const inputNameRegister = document.getElementById("name");
const inputEmailRegister = document.getElementById("email");
const inputPasswordRegister = document.getElementById("password");

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

const user = JSON.parse(localStorage.getItem("user")) || {
  name: "",
  password: "",
  email: "",
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
const isEmpty = (value) => !value;
const isBetween = (length, min, max) => length > min && length < max;
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

const userValidate = () => {
  let valid = false;
  const min = 3;
  const max = 20;
  const username = inputNameRegister.value.trim();
  if (isEmpty(username)) {
    viewError(inputNameRegister, "El nombre de usuario es obligatorio");
  } else if (!isBetween(username.length, min, max)) {
    viewError(
      inputNameRegister,
      `El nombre debe tener entre ${min} y ${max} caracteres`
    );
  } else {
    viewSucces(inputNameRegister);
    valid = true;
  }
  return valid;
};

const emailValidate = () => {
  let valid = false;
  const email = inputEmailRegister.value.trim();
  if (isEmpty(email)) {
    viewError(inputEmailRegister, "El correo es obligatorio");
  } else if (!isEmailValid(email)) {
    viewError(inputEmailRegister, `El correo es incorrecto`);
  } else {
    viewSucces(inputEmailRegister);
    valid = true;
  }
  return valid;
};

const passwordValidate = () => {
  let valid = false;
  const password = inputPasswordRegister.value.trim();
  if (isEmpty(password)) {
    viewError(inputPasswordRegister, "EL campo es obligatorio");
  } else if (!isPasswordValid(password)) {
    viewError(
      inputPasswordRegister,
      "La contraseña debe tener al menos 8 caracteres, una minuscula y un simbolo"
    );
  } else {
    viewSucces(inputPasswordRegister);
    valid = true;
  }
  return valid;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userValid = userValidate();
  const emailValid = emailValidate();
  const passwordValid = passwordValidate();

  const isFormValid = userValid && emailValid && passwordValid;
  if (isFormValid) {
    user.name = inputNameRegister.value.trim();
    user.email = inputEmailRegister.value.trim();
    user.password = inputPasswordRegister.value.trim();
    saveUserToLocalStorage(user);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: `Bienvenido ${user.name} 😁!`,
    });
    setTimeout(function () {
      window.location.href = "../html/login.html";
    }, 2500);
  }
});
