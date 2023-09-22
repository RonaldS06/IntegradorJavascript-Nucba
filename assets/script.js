//Elementos del DOM
const contenedorProductos = document.querySelector(".container__products");
const verMasBtn = document.querySelector(".btn-more");
const contenedorCategorias = document.querySelector(".collection__categories");
const listaCategorias = document.querySelectorAll(".category");

const cartBtn = document.querySelector(".carrito-icono");
const cartMenu = document.querySelector(".cart");

const menuBtn = document.querySelector(".menu-icono");
const barsMenu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");

//CARRITO
const cartProducts = document.querySelector(".container_cart");
const priceTotal = document.querySelector(".priceTotal");

//Modal
const successModal = document.querySelector(".succes-modal")
//Botones carrito disabled
const buyBtn = document.querySelector(".button-total");
const deleteBtn = document.querySelector(".img-delete");
//Bubble
const cartBubble = document.querySelector(".cart-bubble");
const userBubble = document.querySelector(".usuarioLogueado");
const nombreBubble = document.querySelector(".nombreBubble");

//Usuario Icono
const userIconExit = document.querySelector(".usuario-icono");

/* Plantilla de producto */
const plantillaProducto = (producto) => {
  const { id, title, price, productImg } = producto;
  return `
    <div class="card_product">
    <img
      src="${productImg}"
      alt="Producto ${title}"
      width="360" draggable="false"
    />
    <div class="info_product">
      <h3>${title}</h3>
      <div class="precio-btnAdd">
        <span>$${price}</span>
        <button class="btn-add" 
        data-id='${id}'
        data-title='${title}'
        data-price='${price}'
        data-img='${productImg}'>
        Agregar</button>
      </div>
    </div>
  </div>
      `;
};

/* Botón ver más productos */
const ultimoIndiceDe = () => {
  return appState.indiceActualProductos === appState.limiteProductos - 1;
};

const verMasProductos = () => {
  appState.indiceActualProductos += 1;
  const { productos, indiceActualProductos } = appState;
  renderProducts(productos[indiceActualProductos]);

  if (ultimoIndiceDe()) {
    verMasBtn.classList.add("hidden");
  }
};

const renderProducts = (listaDeProductos) => {
  //Contenedor del producto que guardamos
  contenedorProductos.innerHTML += listaDeProductos
    .map(plantillaProducto)
    .join("");
};

const aplicarFiltro = ({ target }) => {
  if (!botonFiltroInactivo(target)) return;
  cambioFiltroEstado(target);
  contenedorProductos.innerHTML = "";
  if (appState.activeFilter) {
    renderProductoFiltro();
    appState.indiceActualProductos = 0;
    return;
  }
  renderProducts(appState.productos[0]);
};

const renderProductoFiltro = () => {
  const filtroProductos = dataProductos.filter(
    (producto) => producto.category === appState.activeFilter
  );
  renderProducts(filtroProductos);
};

const botonFiltroInactivo = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

const cambioFiltroEstado = (btn) => {
  appState.activeFilter = btn.dataset.category;
  cambioBtnActivoEstado(appState.activeFilter);
  setMostrarMasVisible();
};

const cambioBtnActivoEstado = (selectedCategoria) => {
  for (const categoriaBtn of listaCategorias) {
    if (categoriaBtn.dataset.category === selectedCategoria) {
      categoriaBtn.classList.add("active");
    } else {
      categoriaBtn.classList.remove("active");
    }
  }
};

const setMostrarMasVisible = () => {
  if (!appState.activeFilter) {
    verMasBtn.classList.remove("hidden");
    return;
  }
  verMasBtn.classList.add("hidden");
};

const hideLink = (e) => {
  // click link
  if (!e.target.classList.contains("navbar-link")) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};

// Agregar manejador de clic al overlay para ocultar carrito y menú
const hideClickOverlay = () => {
  cartMenu.classList.remove("open-cart");
  barsMenu.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};

//Carrito
const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");

  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

//Menu
const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");

  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

//Función close menu y cart al scrollear
const closeOnScroll = () => {
  if (
    !barsMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  ) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

//CARRITO

//Local Storage set vacio
let cart = JSON.parse(localStorage.getItem("cart")) || [];


const cartSave = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//Render carrito || no hay productos
const cartRender = () => {
  if (!cart.length) {
    cartProducts.innerHTML = `<div class="carrito-vacio">
    <div class="cartIMG"><img src="assets/img/carritoVacio.svg" alt="Carrito sin productos"></div>
    <p>Aún no tienes productos en tu carrito</p>
    <button class="button-total">
        <span><a href="#productos">Comenzar a comprar</a></span>
    </button>
  </div>
  `;
    return;
  }
  cartProducts.innerHTML = cart.map(templateProductCart).join("");
};

const templateProductCart = (templateProduct) => {
  const { id, title, price, img, quantity } = templateProduct;
  let quantityUnidad = quantity === 1 ? '1U' : quantity;
  return `
  <div class="cart_products">
    <div class="cart_item">
      <div class="img-info-cart">
        <img src="${img}" alt="imagen de ${title}" width="90" height="90" class="fit-content">
          <div class="info_product_item">
            <h3>${title}</h3>
            <span>$${price}</span>
          </div>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantityUnidad}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>
  </div>
  `;
};

//ver Total compra
const cartPriceTotal = () => {
  //Fn auxiliar para traer el total del carrito
  priceTotal.innerHTML = `
  Subtotal: <b>$${getCartTotal().toFixed(2)}</b>
  `;
};


//obtener TOTAL compra - modificado
const getCartTotal = () => {
  return cart.reduce((acc, valorActual) => {
    return acc + Number(valorActual.price) * valorActual.quantity;
  }, 0);
};


//Logica para agregar productos al carrito
const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) {
    return;
  }

  const producto = crearProductoData(e.target.dataset);

  if (ExisteProductoEnCarrito(producto)) {
    addUnitToProduct(producto);

    //Mostrar msj o feedback
    verModalSucces("Se agregó una unidad más al carrito 💪");
  } else {
    //creamos el producto en el carrito
    crearProductoEnCarrito(producto);
    verModalSucces("El producto se agregó al carrito 😎");
  }

  actualizarCartState();
};

//Desestructura
const crearProductoData = (producto) => {
  const { id, title, price, img } = producto;
  return { id, title, price, img };
}
//Comprobar si ya fue agregado al carrito
const ExisteProductoEnCarrito = (producto) => {
  return cart.find((item) => item.id === producto.id)
}

//Agregar unidad al producto desde el carrito
const addUnitToProduct = (producto) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === producto.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};


//Fn para darle info al usuario
const verModalSucces = (msg) => {
  successModal.classList.add("showModal")
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("showModal")
  }, 1500);
}

//Creamos objeto con la info del producto que queremos agregar
const crearProductoEnCarrito = (producto) => {
  cart = [...cart, { ...producto, quantity: 1 }]
}

// Habilitar o deshabilitar un botón segun corresponda
const disabledBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("hidden")
  } else {
    btn.classList.remove("hidden")
  }
}

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, valorActual) => {
    return acc + valorActual.quantity;
  }, 0);
}

//Actualizar carrito
const actualizarCartState = () => {
  //Guardamos en Ls
  cartSave();
  //Render carrito
  cartRender();
  //Total
  cartPriceTotal();

  //misma fnc para ambos botones
  disabledBtn(buyBtn);
  disabledBtn(deleteBtn);
  //Render Bubble
  renderCartBubble();
}

//Evento click del botón mas para cada producto del carrito
const btnEventAumentar = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  addUnitToProduct(existingCartProduct);
}

const btnEventDismunuir = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  //Si se toco en un item con uno solo de cantidad
  if (existingCartProduct.quantity === 1) {
    if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
      removerProductoDeCarrito(existingCartProduct);
    }
    return;
  }
  substraerUnidadProducto(existingCartProduct);
}

// Funcion para quitar unidad
const substraerUnidadProducto = (productoExistente) => {
  cart = cart.map((producto) => {
    return producto.id === productoExistente.id
      ? { ...producto, quantity: Number(producto.quantity) - 1 }
      : producto;
  });
};

//Eliminar unidad producto
const removerProductoDeCarrito = (productoExistente) => {
  cart = cart.filter((producto) => producto.id !== productoExistente.id);
  actualizarCartState();
}

const manejarCantidad = (e) => {
  if (e.target.classList.contains("down")) {
    btnEventDismunuir(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    btnEventAumentar(e.target.dataset.id);
  }
  actualizarCartState();
}

//Vaciar Carrito
const resetCartItems = () => {
  cart = [];
  actualizarCartState();
};

//Completar compra o vaciar carrito
const completarCartAction = (confirmarMsg, succesMsg) => {
  if (!cart.length) return;

  if (window.confirm(confirmarMsg)) {
    resetCartItems();
    alert(succesMsg);
  }
}

// Realizar compra + usuario logueado
const completarCompra = () => {

  if (!isUserExisting()) {
    alert("Necesitas Iniciar Sesión o Registrarte para poder realizar la compra 💪")
    window.location.href = "/pages/login.html";
    return;
  }
  completarCartAction("¿Desea completar su compra?", "Gracias por su compra😁")
}
const isUserExisting = () => {
  const activeUser = sessionStorage.getItem("activeUser");
  return !!activeUser;
}

// const userBubble = document.querySelector(".usuarioLogueado");
const loadUser = () => {
  const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

  if (activeUser && activeUser.name) {
    userBubble.style.display = "flex"; // Muestra el contenedor de usuario logueado
    nombreBubble.textContent = `Hola ${activeUser.name}`;

    const imgElement = document.querySelector(".usuario-icono a img");
    imgElement.setAttribute("src", "assets/img/icon-exit.svg");
  }

}



// const userIconExit = document.querySelector(".usuario-icono");
const exitUser = () => {
  if (isUserExisting()) {
    const linkElement = document.querySelector(".usuario-icono a");
    linkElement.removeAttribute("href");
    if (confirm("¿Desea salir de su cuenta?")) {
      sessionStorage.removeItem("activeUser");
      alert("Ha cerrado su cuenta correctamente");
      window.location.href = "index.html"
    }
  }
}

//Carrito vaciado msj
const eliminarCarrito = () => {
  completarCartAction("¿Desea vaciar el carrito?", "No hay productos en el carrito")
}

/* Función Inicializadora */
const init = () => {
  renderProducts(appState.productos[0]);

  verMasBtn.addEventListener("click", verMasProductos);
  contenedorCategorias.addEventListener("click", aplicarFiltro);
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", hideClickOverlay);
  barsMenu.addEventListener("click", hideLink);
  /* Scroll */
  window.addEventListener("scroll", closeOnScroll);
  //Carrito
  document.addEventListener("DOMContentLoaded", cartRender);
  document.addEventListener("DOMContentLoaded", cartPriceTotal);
  document.addEventListener("DOMContentLoaded", loadUser)
  //Add productos
  contenedorProductos.addEventListener("click", addProduct);

  //
  cartProducts.addEventListener("click", manejarCantidad);
  buyBtn.addEventListener("click", completarCompra);
  deleteBtn.addEventListener("click", eliminarCarrito);
  userIconExit.addEventListener("click", exitUser)

  //misma fnc para ambos botones
  disabledBtn(buyBtn);
  disabledBtn(deleteBtn);
  renderCartBubble(cart);
};
init();