// Array de productos
const dataProductos = [
    /* Remeras */
    {
        id: 1,
        title: "Remera Heavy W.",
        price: "8030",
        category: "remeras",
        productImg: "assets/img/productos/remera-1.webp",
    },
    {
        id: 2,
        title: "Remera Ryan",
        price: "2455",
        category: "remeras",
        productImg: "assets/img/productos/remera-2.webp",
    },
    {
        id: 3,
        title: "Remera Trouble",
        price: "6019",
        category: "remeras",
        productImg: "assets/img/productos/remera-3.webp",
    },
    {
        id: 4,
        title: "Remera Feather",
        price: "9032",
        category: "remeras",
        productImg: "assets/img/productos/remera-4.webp",
    },

    /* Pantalones */
    {
        id: 5,
        title: "Jean Aperol",
        price: "2039",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-1.webp",
    },
    {
        id: 6,
        title: "Jean Kratos",
        price: "2455",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-2.webp",
    },
    {
        id: 7,
        title: "Jen Tonic",
        price: "1019",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-3.webp",
    },
    {
        id: 8,
        title: "Pantalón Killer",
        price: "3031",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-4.webp",
    },
    {
        id: 9,
        title: "Pantalón Oceania",
        price: "1299",
        category: "pantalones",
        productImg: "assets/img/productos/pantalon-5.webp",
    },

    /* Buzos */
    {
        id: 10,
        title: "Buzo Mood",
        price: "3039",
        category: "buzos",
        productImg: "assets/img/productos/buzo-1.webp",
    },
    {
        id: 11,
        title: "Buzo Caring",
        price: "5455",
        category: "buzos",
        productImg: "assets/img/productos/buzo-2.webp",
    },
    {
        id: 12,
        title: "Buzo Hell",
        price: "4019",
        category: "buzos",
        productImg: "assets/img/productos/buzo-3.webp",
    },
    {
        id: 14,
        title: "Buzo Snow",
        price: "4299",
        category: "buzos",
        productImg: "assets/img/productos/buzo-5.webp",
    },


    /* Lentes */
    {
        id: 15,
        title: "Anteojo Magic",
        price: "1039",
        category: "lentes",
        productImg: "assets/img/productos/lentes-1.webp",
    },
    {
        id: 16,
        title: "Anteojo HookPin",
        price: "0455",
        category: "lentes",
        productImg: "assets/img/productos/lentes-2.webp",
    },
    {
        id: 17,
        title: "Anteojo Rood",
        price: "019",
        category: "lentes",
        productImg: "assets/img/productos/lentes-3.webp",
    },
    {
        id: 18,
        title: "Anteojo Razer",
        price: "031",
        category: "lentes",
        productImg: "assets/img/productos/lentes-4.webp",
    },
    {
        id: 19,
        title: "Anteojo Atenas",
        price: "299",
        category: "lentes",
        productImg: "assets/img/productos/lentes-5.webp",
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