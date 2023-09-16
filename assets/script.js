//Elementos del DOM
const contenedorProductos = document.querySelector(".container__products");
const verMasBtn = document.querySelector(".btn-more");
const contenedorCategorias = document.querySelector(".collection__categories");
const listaCategorias = document.querySelectorAll(".category");

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
        <button class="btn-add" data-id='${id}'>Agregar</button>
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
  console.log("elemento objetivo: ", target)

  if (!botonFiltroInactivo(target)) return;
  cambioFiltroEstado(target);
  contenedorProductos.innerHTML = '';
  if (appState.activeFilter) {
    renderProductoFiltro();
    appState.indiceActualProductos = 0;
    return;
  }
  renderProducts(appState.productos[0])
};

const renderProductoFiltro = () => {
  const filtroProductos = dataProductos.filter((producto) => producto.category === appState.activeFilter);
  renderProducts(filtroProductos);
}

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
    if (categoriaBtn.dataset.category !== selectedCategoria) {
      categoriaBtn.classList.remove("active");
    } else {
      categoriaBtn.classList.add("active");
    }
  }
};

const setMostrarMasVisible = () => {
  if (!appState.activeFilter) {
    verMasBtn.classList.remove("hidden")
    return
  }
  verMasBtn.classList.add("hidden")
};
/* Función Inicializadora */
const init = () => {
  renderProducts(appState.productos[0]);

  verMasBtn.addEventListener("click", verMasProductos);
  contenedorCategorias.addEventListener("click", aplicarFiltro);
};
init();
