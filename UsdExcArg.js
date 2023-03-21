let dolares = [];
let carroDeCompras = [];
const miUrl = "json/productos.json"

fetch(miUrl)
    .then(response => response.json())
    .then(data =>{
        dolares = data;
        mostrarDolares(data);
    })
    .catch(error => console.log(error));

if(localStorage.getItem("carroDeCompras")){
    carroDeCompras = JSON.parse(localStorage.getItem("carroDeCompras"));
}

const contenedorDolares = document.getElementById("contenedorDolares");

const mostrarDolares = () => {
    dolares.forEach(dolar => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class = "card">
                            <img src = "${dolar.img}" class = "card-img-top imgTipoDeDolar" alt = "${dolar.nombre}">
                            <div>
                                <h3>${dolar.nombre}</h2>
                                <p>${dolar.precio}</p>
                                <button class = "btn colorBoton " id = "boton${dolar.id}">Agregar al carro</button>
                            </div>
                        </div>
                        `
        contenedorDolares.appendChild(card)  
        
        const boton = document.getElementById(`boton${dolar.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarro(dolar.id);
            Toastify({
                text: "Verde agregado al carro",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "darkgreen",
            }).showToast();
        })
    })
}

const agregarAlCarro = (id) => {
    const dolar = dolares.find(dolar => dolar.id === id);
    const dolarEnCarro = carroDeCompras.find(dolar => dolar.id === id);
    if(dolarEnCarro) {
        dolarEnCarro.cantidad++;
    } else {
        carroDeCompras.push(dolar);
    }
    calcularTotal();
    localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras));
    mostrarCarro();
}

const contenedorCarro = document.getElementById("contenedorCarro");
const verCarro = document.getElementById("verCarro");

verCarro.addEventListener("click", () => {
    mostrarCarro();
})

const mostrarCarro = () => {
    contenedorCarro.innerHTML = "";
    carroDeCompras.forEach(dolar => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class = "card">
                            <img src = "${dolar.img}" class = "card-img-top imgTipoDeDolar" alt = "${dolar.nombre}">
                            <div>
                                <h3>${dolar.nombre}</h2>
                                <p>${dolar.precio}</p>
                                <p>${dolar.cantidad}</p>
                                <button class = "btn colorBoton " id = "eliminar${dolar.id}">Sacar del carro</button>
                                <button class = "btn colorBoton " id = "aumentar${dolar.id}"> + </button>
                                <button class = "btn colorBoton " id = "disminuir${dolar.id}"> - </button>
                            </div>
                        </div>
                        `
        contenedorCarro.appendChild(card);

        const disminuirUno = document.getElementById(`disminuir${dolar.id}`);
        disminuirUno.addEventListener("click", () => {
        restarUno(dolar.id);
        });

        const agregarUno = document.getElementById(`aumentar${dolar.id}`);
        agregarUno.addEventListener("click", () => {
        sumarUno(dolar.id);
        });
        

        const boton = document.getElementById(`eliminar${dolar.id}`);
        boton.addEventListener("click", () => {
        SacarDelCarro(dolar.id);
        })
    })
    calcularTotal();
}

const sumarUno = (id) => {
    const dolar = carroDeCompras.find(dolar => dolar.id === id);
    dolar.cantidad++;
    localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras));
    mostrarCarro();
}

const restarUno = (id) => {
    const dolar = carroDeCompras.find(dolar => dolar.id === id);
    dolar.cantidad--;
    if(dolar.cantidad === 0){
        SacarDelCarro(id);
    }else{
        localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras))
    }
    mostrarCarro();
}

const SacarDelCarro = (id) => {
    const dolar = carroDeCompras.find(dolar => dolar.id === id);
    const indice = carroDeCompras.indexOf(dolar);
    carroDeCompras.splice(indice, 1);
    mostrarCarro();
    localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras));
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carroDeCompras.forEach(tipoDeDolar => {
        totalCompra += tipoDeDolar.precio * tipoDeDolar.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

const vaciarCarro = document.getElementById("vaciarCarro");

vaciarCarro.addEventListener("click", () => {
    eliminarTodoElCarro();
})

const eliminarTodoElCarro = () => {
    carroDeCompras = []; 
    mostrarCarro();
    localStorage.clear();
}

const comprar = document.getElementById("comprar");

comprar.addEventListener("click", () => {
    Swal.fire({
        title: 'Seguro que deseas llevarte los verdes ya mismo?',
        text: 'Te recomendaria que si, cada segundo que pasa tu moneda vale menos que un samuelin!',
        icon: 'question',
        confirmButtonText: 'SIII'
    })
})