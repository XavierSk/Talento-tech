document.addEventListener("DOMContentLoaded", () => {
  const telefono = "573001112233"; // Cambia por tu número
  const carrito = [];

  const datosMenu = {
    entradas: [
      { nombre: "Canastas de camarón", descripcion: "Canastas de plátano rellenas de camarones en salsa.", precio: 18000, imagen: "img/plato4.jpg", etiqueta: "Recomendado" },
      { nombre: "Ceviche de pescado", descripcion: "Marinado en limón con cebolla, cilantro y ají.", precio: 15000, imagen: "img/Ceviche de pescado.jpg", etiqueta: "Nuevo" }
    ],
    platos: [
      { nombre: "Camarón con arroz a la CocaCola", descripcion: "Camarones en salsa, con arroz a la CocaCola, patacones y ensalada.", precio: 35000, imagen: "img/plato1.jpg" },
      { nombre: "Pargo frito", descripcion: "Con patacones y ensalada de cebolla morada.", precio: 38000, imagen: "img/plato8.jpg", etiqueta: "Más vendido" },
      { nombre: "Tilapia en salsa de camarones", descripcion: "Con patacones, ensalada y arroz a la CocaCola.", precio: 32000, imagen: "img/plato2.jpg" },
      { nombre: "Sierra frita", descripcion: "Con plátano cocido y ensalada de lechuga.", precio: 30000, imagen: "img/plato6.jpg" }
    ],
    bebidas: [
      { nombre: "Limonada de Coco", descripcion: "Natural y energética, servida fría.", precio: 9000, imagen: "img/LIMONADA_COCO.jpg" },
      { nombre: "Lulada", descripcion: "Refrescante bebida de lulo con hielo y azúcar.", precio: 8000, imagen: "img/Lulada.jpg" }
    ],
    postres: [
      { nombre: "Cocadas", descripcion: "Dulces tradicionales de coco.", precio: 6000, imagen: "img/cocadas.jpg" },
      { nombre: "Torta de chontaduro", descripcion: "Postre típico con sabor único.", precio: 7000, imagen: "img/Torta de chontaduro.jpg" }
    ]
  };

  // Renderizar el menú
  for (let categoria in datosMenu) {
    const contenedor = document.getElementById(categoria);
    datosMenu[categoria].forEach(plato => {
      const card = document.createElement("div");
      card.classList.add("menu-item");
      card.innerHTML = `
        <div class="menu-img-container">
          <img src="${plato.imagen}" alt="${plato.nombre}" class="menu-img" />
          ${plato.etiqueta ? `<span class="menu-badge">${plato.etiqueta}</span>` : ""}
        </div>
        <h3>${plato.nombre}</h3>
        <p>${plato.descripcion}</p>
        <p class="precio">$${plato.precio.toLocaleString("es-CO")}</p>
        <button class="btn-pedir" data-nombre="${plato.nombre}" data-precio="${plato.precio}">
          <i class="bi bi-cart-plus"></i> Agregar
        </button>
      `;
      contenedor.appendChild(card);
    });
  }

  // Agregar al carrito
  document.body.addEventListener("click", e => {
    if (e.target.closest(".btn-pedir")) {
      const btn = e.target.closest(".btn-pedir");
      const nombre = btn.dataset.nombre;
      const precio = parseInt(btn.dataset.precio);
      carrito.push({ nombre, precio });
      actualizarCarrito();
    }
  });

  // Actualizar el contador y el modal
  function actualizarCarrito() {
    document.getElementById("carritoContador").textContent = carrito.length;

    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
      total += item.precio;
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - $${item.precio.toLocaleString("es-CO")}`;
      lista.appendChild(li);
    });

    document.getElementById("totalCarrito").textContent = total.toLocaleString("es-CO");

    const mensaje = carrito.map(item => `${item.nombre} - $${item.precio.toLocaleString("es-CO")}`).join("%0A");
    document.getElementById("btnEnviarPedido").href = `https://wa.me/${telefono}?text=Hola,%20quiero%20hacer%20este%20pedido:%0A${mensaje}%0ATotal:%20$${total.toLocaleString("es-CO")}`;
  }

  // Abrir y cerrar modal
  document.getElementById("carritoBtn").addEventListener("click", () => {
    document.getElementById("modalCarrito").style.display = "flex";
  });
  document.getElementById("cerrarModal").addEventListener("click", () => {
    document.getElementById("modalCarrito").style.display = "none";
  });
});
