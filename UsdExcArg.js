class tipoDeDolar {
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre; 
        this.precio = precio;
        this.img = img; 
        this.cantidad = 1;
    }
}

const one = new tipoDeDolar(1, "One Dollar", 377, "./img/oneDollar.jpg");
const two = new tipoDeDolar(2, "Two Dollars", 754, "./img/twoDollars.jpg");
const five = new tipoDeDolar(3, "Five Dollars", 1885, "./img/fiveDollars.jpg");
const ten = new tipoDeDolar(4, "Ten Dollars", 3770, "./img/tenDollars.jpg");
const twenty = new tipoDeDolar(5, "Twenty Dollars", 7540, "./img/twentyDollars.jpg");
const fifty = new tipoDeDolar(6, "Fifty Dollars", 18850, "./img/fiftyDollars.jpg");
const oneHundred = new tipoDeDolar(7, "One Hundred Dollars", 37700, "./img/oneHundredDollars.jpg");


const arrayTiposDeDolar = [one, two, five, ten, twenty, fifty, oneHundred];
console.log(arrayTiposDeDolar);

let carroDeCompras = [];

if(localStorage.getItem("carroDeCompras")){
    carroDeCompras = JSON.parse(localStorage.getItem("carroDeCompras"));
}

const contenedorDolares = document.getElementById("contenedorDolares");

const mostrarDolares = () => {
    arrayTiposDeDolar.forEach(tipoDeDolar => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class = "card">
                            <img src = "${tipoDeDolar.img}" class = "card-img-top imgTipoDeDolar" alt = "${tipoDeDolar.nombre}">
                            <div>
                                <h3>${tipoDeDolar.nombre}</h2>
                                <p>${tipoDeDolar.precio}</p>
                                <button class = "btn colorBoton " id = "boton${tipoDeDolar.id}">Agregar al carro</button>
                            </div>
                        </div>
                        `
        contenedorDolares.appendChild(card)  
        
        const boton = document.getElementById(`boton${tipoDeDolar.id}`);
        boton.addEventListener("click", () => {
        agregarAlCarro(tipoDeDolar.id);
        })
    })
}

mostrarDolares();

const agregarAlCarro = (id) => {
    const dolarEnCarro = carroDeCompras.find(tipoDeDolar => tipoDeDolar.id === id);
    if(dolarEnCarro) {
        dolarEnCarro.cantidad++;
    } else {
        const tipoDeDolar = arrayTiposDeDolar.find(tipoDeDolar => tipoDeDolar.id === id);
        carroDeCompras.push(tipoDeDolar);
    }
    calcularTotal();
    localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras));
}

const contenedorCarro = document.getElementById("contenedorCarro");
const verCarro = document.getElementById("verCarro");

verCarro.addEventListener("click", () => {
    mostrarCarro();
})

const mostrarCarro = () => {
    contenedorCarro.innerHTML = "";
    carroDeCompras.forEach(tipoDeDolar => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class = "card">
                            <img src = "${tipoDeDolar.img}" class = "card-img-top imgTipoDeDolar" alt = "${tipoDeDolar.nombre}">
                            <div>
                                <h3>${tipoDeDolar.nombre}</h2>
                                <p>${tipoDeDolar.precio}</p>
                                <p>${tipoDeDolar.cantidad}</p>
                                <button class = "btn colorBoton " id = "eliminar${tipoDeDolar.id}">Sacar del carro</button>
                            </div>
                        </div>
                        `
        contenedorCarro.appendChild(card);

        const boton = document.getElementById(`eliminar${tipoDeDolar.id}`);
        boton.addEventListener("click", () => {
        SacarDelCarro(tipoDeDolar.id);
        })
    })
    calcularTotal();
}

const SacarDelCarro = (id) => {
    const tipoDeDolar = carroDeCompras.find(tipoDeDolar => tipoDeDolar.id === id);
    const indice = carroDeCompras.indexOf(tipoDeDolar);
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