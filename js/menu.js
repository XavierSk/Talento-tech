document.addEventListener("DOMContentLoaded", () => {
  const datosMenu = {
    entradas: [
      {
        nombre: "Canastas de camaron",
        descripcion: "Canastas de platano llenas de unos deliciosos camarones en salsa.",
        imagen: "img/plato4.jpg"
      },
      {
        nombre: "Ceviche de pescado",
        descripcion: "Marinado en limón con cebolla, cilantro y ají.",
        imagen: "img/Ceviche de pescado.jpg"
      }
    ],
    platos: [
      {
        nombre: "Camarón con arroz a la CocaCola",
        descripcion: "Camarones bañados en una deliciosa salsa, acompañados de arroz a la cocacola, patacones y ensalada.",
        imagen: "img/plato1.jpg"
      },
      {
        nombre: "Pargo frito",
        descripcion: "Con patacones y ensalada de cebolla morada.",
        imagen: "img/plato8.jpg"
      },
      {
        nombre: "Tilapia en salsa de camarones",
        descripcion: "Con patacones, ensalada de lechuga y arroz a la cocacola.",
        imagen: "img/plato2.jpg"
      },
      {
        nombre: "cierra frita",
        descripcion: "Con platano cocido y ensalada de lechuga",
        imagen: "img/plato6.jpg"
      }
    ],
    bebidas: [
      {
        nombre: "Limonada de Coco",
        descripcion: "Natural y energética, servida frío.",
        imagen: "img/LIMONADA_COCO.jpg"
      },
      {
        nombre: "Lulada",
        descripcion: "Refrescante bebida de lulo con hielo y azúcar.",
        imagen: "img/Lulada.jpg"
      }
    ],
    postres: [
      {
        nombre: "Cocadas",
        descripcion: "Dulces tradicionales de coco.",
        imagen: "img/cocadas.jpg"
      },
      {
        nombre: "Torta de chontaduro",
        descripcion: "Postre típico con sabor único.",
        imagen: "img/Torta de chontaduro.jpg"
      }
    ]
  };

  for (let categoria in datosMenu) {
    const contenedor = document.getElementById(categoria);
    datosMenu[categoria].forEach(plato => {
      const card = document.createElement("div");
      card.classList.add("menu-item");
      card.innerHTML = `
        <img src="${plato.imagen}" alt="${plato.nombre}" class="menu-img" />
        <h3>${plato.nombre}</h3>
        <p>${plato.descripcion}</p>
      `;
      contenedor.appendChild(card);
    });
  }
});
