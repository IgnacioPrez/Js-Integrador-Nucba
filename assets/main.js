const productContainer = document.getElementById("product-container");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const pageNumber = document.getElementById("page-number");
const btnToggleOne = document.getElementById("menu-toggle");
const btnToggleTwo = document.getElementById("menu-toggle-two");
const navbar = document.getElementById("nav");
const btnCarToggle = document.getElementById("btn-car-toggle");
const menuCar = document.getElementById("carrito");
const car = document.getElementById("car");
const total = document.getElementById("total");
const buyFinish = document.getElementById("buy-finish");
const btnCancelBuy = document.getElementById("cancel-buy");
const containerSesion = document.getElementById("check-sesion");

const productContainerInCar = document.getElementById(
  "container-product-in-car"
);
const saveToLocalStorage = (product) =>
  localStorage.setItem("cart", JSON.stringify(product));

let productInCar = JSON.parse(localStorage.getItem("cart")) || [];
const pageController = {
  page: 1,
};

const loader = () => {
  return `<div class="three-body">
    <div class="three-body__dot"></div>
    <div class="three-body__dot"></div>
    <div class="three-body__dot"></div>
    </div>`;
};

const renderUser = (user) => {
  return user
    ? `        <img src="./assets/img/user.svg" alt="user-icon" />
    <p>${user.name}</p>`
    : `        <img src="./assets/img/user.svg" alt="user-icon" />
    <a href="./html/login.html">Iniciar sesion</a>`;
};

const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  if(user){
    containerSesion.innerHTML = renderUser(user)
  }
  else {
    containerSesion.innerHTML = renderUser()
  }
}

const getPhotosHtml = ({ urls, alt_description, id }) => {
  let price = 0;
  return `
        <div class="card" id="${id}">
            <img 
             class="card-img"
             alt="${alt_description}"
             src="${urls.regular}"
             />
            <div class="product-info">
            <p>
            ${alt_description}
            </p>
            <span class="price">
              $ ${(price = Math.floor(Math.random() * 250))}
            </span>
            <button 
            class="product-info-button"
            data-id="${id}"
            data-bid="${price}"
            data-img="${urls.regular}"
            data-name="${alt_description}"
            >añadir al carrito</button>
            </div>
        </div>
    `;
};
const success = (title) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};
const isExistinCar = ({ id }) => productInCar.some((product) => product.id === id);

const checkCarState = () => {
  saveToLocalStorage(productInCar);
  renderCar();
  totalPayment();
};

const addUnitProduct = (product) => {
  productInCar = productInCar.map((el) =>
    el.id === product.id ? { ...product, quantity: el.quantity + 1 } : product
  );
};
function addTocar(e) {
  if (!e.target.classList.contains("product-info-button")) return;
  const { id, bid, img, name } = e.target.dataset;
  const product = { id, name, bid, img };
  if (isExistinCar(product)) {
    addUnitProduct(product);
    success("Se agrego otra unidad del producto al carrito");
  } else {
    createProduct(product);
    success("Su producto se agrego correctamente");
  }
  checkCarState();
}
const createProduct = (product) => {
  productInCar = [...productInCar, { ...product, quantity: 1 }];
};
const renderCarProduct = (product) => {
  return `
      <div class="component-cart">
      <img src="${product.img}" alt="${product.name}"/>
      <div class="component-card-info">
      <p>Valor: $${product.bid}</p>

        <p>${product.name}</p>
        <p>Cantidad: ${product.quantity}</p>
      </div>
      </div>
  `;
};
const renderCar = () => {
  if (!productInCar.length) {
    productContainerInCar.innerHTML = `
    <div class="message-the-car">
    <p>No hay Articulos en tu carrito</p>
    </div>
    `;
    return;
  }
  productContainerInCar.innerHTML = productInCar.map(renderCarProduct).join("");
};

const renderPhotos = (photos) => {
  productContainer.innerHTML = photos
    .map((photo) => getPhotosHtml(photo))
    .join("");
};

const getShirts = async () => {
  productContainer.innerHTML = loader();
  const shirts = await fetchPhotos(photosUrl);
  pageController.total = shirts.total_pages;
  //manejar paginacion
  setPage();
  //render photos
  renderPhotos(shirts.results);
};

/* Menu hamburguesa */

const toggleMenuOpen = () => {
  navbar.classList.toggle("open-menu");
  document.body.classList.toggle("opacity");
};
const toggleMenuClose = () => {
  navbar.classList.toggle("open-menu");
  document.body.classList.toggle("opacity");
};

const openCar = () => {
  menuCar.classList.toggle("open-car");
  document.body.classList.toggle("opacity");
};

const closeCar = () => {
  menuCar.classList.toggle("open-car");
  document.body.classList.toggle("opacity");
};

const disablePreviousBtn = (page) => {
  if (page === 1) {
    prevBtn.style.visibility = "hidden";
  } else {
    prevBtn.style.visibility = "visible";
    prevBtn.style.visibility;
  }
};

const disableNextBtn = (page, total) => {
  if (page === total) {
    nextBtn.style.visibility = "hiden";
  } else {
    nextBtn.style.visibility = "visible";
  }
};

const setPage = () => {
  pageNumber.innerHTML = pageController.page;
  disablePreviousBtn(pageController.page);
  disableNextBtn(pageController.page, pageController.total);
};

const onePagination = async (page) => {
  try {
    productContainer.innerHTML = loader();
    const response = await fetch(`${photosUrl}&page=${!page ? null : page}`);
    const responseData = await response.json();
    setPage();
    renderPhotos(responseData.results);
  } catch (error) {
    return error;
  }
};
const nextPage = async (e) => {
  e.stopImmediatePropagation();
  if (pageController.page === pageController.total) return;
  pageController.page += 1;
  onePagination(pageController.page);
};

const prevPage = async (e) => {
  e.stopImmediatePropagation();
  if (pageController.page === pageController.total) return;
  pageController.page -= 1;
  await onePagination(pageController.page);
};

// calculo
const getCartTotal = () => {
  return productInCar.reduce(
    (acc, currentValue) =>
      acc + Number(currentValue.bid) * currentValue.quantity,
    0
  );
};

const totalPayment = () => {
  total.innerHTML = `$ ${getCartTotal().toFixed(2)}`;
};

const errorMessage = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};
const buyComplete = () => {
  if (!productInCar.length) {
    errorMessage("Parece que no tienes nada en tu carrito 🤔");
    return;
  } else {
    removeToLocalStorage();
    productInCar = [];
    checkCarState();
    success("Su compra se realizo correctamente!");
  }
};
const alertMessage = (text) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: text,
  });
};
const removeToLocalStorage = () => localStorage.removeItem("cart");
const cancelBuy = () => {
  if (!productInCar.length) {
    errorMessage("No hay nada que eliminar 🙄");
    return;
  } else {
    productInCar = [];
    removeToLocalStorage();
    checkCarState();
    alertMessage("Eliminando...");
  }
};
function init() {
  //evento que se escucha cuando todo nuestro contenido se carga
  window.addEventListener("DOMContentLoaded", getShirts);
  window.addEventListener("DOMContentLoaded",getUser)
  btnToggleOne.addEventListener("click", toggleMenuOpen);
  btnToggleTwo.addEventListener("click", toggleMenuClose);
  car.addEventListener("click", openCar);
  btnCarToggle.addEventListener("click", closeCar);
  nextBtn.addEventListener("click", nextPage);
  prevBtn.addEventListener("click", prevPage);
  document.addEventListener("DOMContentLoaded", renderCar);
  document.addEventListener("DOMContentLoaded", totalPayment);
  productContainer.addEventListener("click", addTocar);
  buyFinish.addEventListener("click", buyComplete);
  btnCancelBuy.addEventListener("click", cancelBuy);
}

init();
