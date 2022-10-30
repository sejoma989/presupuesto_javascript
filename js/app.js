const ingresos = [
    new Ingreso('Salario', 2200.00),
    new Ingreso('Venta coche', 1500.00),
];

const egresos = [
    new Egreso('Renta departamento', 900),
    new Egreso('Ropa', 600)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    // console.log(totalIngresos());
    // console.log(totalEgresos());
    // console.log(porcentajeEgreso);
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

let formatoMoneda = ( valor ) => {
    return valor.toLocaleString('en-US', {
        style:'currency',
        currency: 'USD',
        minimumFractionDigits:2
    });
}

let formatoPorcentaje = ( valor ) => {
    return valor.toLocaleString('en-US', {
        style:'percent',
        minimumFractionDigits:1
    });
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = ( ingreso ) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                    onclick='eliminarIngreso(${ingreso.id})' ></ion-icon>
            </button>
        </div>
    </div>
</div>  
    `;
    return ingresoHTML;
}

const eliminarIngreso = ( id ) => {
    let elementoEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(elementoEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML( egreso );
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = ( egreso ) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje( egreso.valor / totalEgresos() )}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                    onclick='eliminarEgreso(${egreso.id})' ></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

const eliminarEgreso = ( id ) => {
    let elementoEliminar = egresos.findIndex( egreso => egreso.id === id );
    egresos.splice(elementoEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

