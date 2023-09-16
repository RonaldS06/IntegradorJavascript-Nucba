// Array de productos
const dataProductos = [
    /* Remeras */
    {
        id: 1,
        title: "Remera Heavy W.",
        price: "18030",
        category: "remeras",
        productImg: "assets/img/productos/remera-1.jpg",
    },
    {
        id: 2,
        title: "Remera Ryan",
        price: "12455",
        category: "remeras",
        productImg: "assets/img/productos/remera-2.jpg",
    },
    {
        id: 3,
        title: "Remera Trouble",
        price: "16019",
        category: "remeras",
        productImg: "assets/img/productos/remera-3.jpg",
    },
    {
        id: 4,
        title: "Remera Feather",
        price: "19032",
        category: "remeras",
        productImg: "assets/img/productos/remera-4.jpg",
    },

    /* Pantalones */
    {
        id: 5,
        title: "Jean Aperol",
        price: "12039",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-1.jpg",
    },
    {
        id: 6,
        title: "Jean Kratos",
        price: "12455",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-2.jpg",
    },
    {
        id: 7,
        title: "Jen Tonic",
        price: "11019",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-3.jpg",
    },
    {
        id: 8,
        title: "Pantalón Killer",
        price: "13031",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-4.jpg",
    },
    {
        id: 9,
        title: "Pantalón Oceania",
        price: "11299",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-5.jpg",
    },

    /* Buzos */
    {
        id: 10,
        title: "Buzo Mood",
        price: "13039",
        category: "buzos",
        productImg: "assets/img/productos/buzo-1.jpg",
    },
    {
        id: 11,
        title: "Buzo Caring",
        price: "15455",
        category: "buzos",
        productImg: "assets/img/productos/buzo-2.jpg",
    },
    {
        id: 12,
        title: "Buzo Hell",
        price: "14019",
        category: "buzos",
        productImg: "assets/img/productos/buzo-3.jpg",
    },
    {
        id: 14,
        title: "Buzo Snow",
        price: "14299",
        category: "buzos",
        productImg: "assets/img/productos/buzo-5.jpg",
    },


    /* Lentes */
    {
        id: 15,
        title: "Anteojo Magic",
        price: "11039",
        category: "lentes",
        productImg: "assets/img/productos/lentes-1.jpg",
    },
    {
        id: 16,
        title: "Anteojo HookPin",
        price: "10455",
        category: "lentes",
        productImg: "assets/img/productos/lentes-2.jpg",
    },
    {
        id: 17,
        title: "Anteojo Rood",
        price: "9019",
        category: "lentes",
        productImg: "assets/img/productos/lentes-3.jpg",
    },
    {
        id: 18,
        title: "Anteojo Razer",
        price: "8031",
        category: "lentes",
        productImg: "assets/img/productos/lentes-4.jpg",
    },
    {
        id: 19,
        title: "Anteojo Atenas",
        price: "9299",
        category: "lentes",
        productImg: "assets/img/productos/lentes-5.jpg",
    }
]

mostrarCantidadDeProductos = (cantidad) => {
    let listaDeProductos = []

    for (let i = 0; i < dataProductos.length; i += cantidad) {
        listaDeProductos.push(dataProductos.slice(i, i + cantidad))
    }
    return listaDeProductos
}

const appState = {
    productos: mostrarCantidadDeProductos(6),
    indiceActualProductos: 0,
    limiteProductos: mostrarCantidadDeProductos(6).length,
    activeFilter: null
}