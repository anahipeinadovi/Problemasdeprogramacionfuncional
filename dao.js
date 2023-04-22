const fs = require('fs');

class Producto {
  constructor(clave, descripcion, precio, clasificacion, existencia, existenciaMin, existenciaMax) {
    this.clave = clave;
    this.descripcion = descripcion;
    this.precio = precio;
    this.clasificacion = clasificacion;
    this.existencia = existencia;
    this.existenciaMin = existenciaMin;
    this.existenciaMax = existenciaMax;
  }
}

class DAO {
  constructor(nombreArchivo) {
    this.productos = [];
    this.cargarProductosDesdeArchivo(nombreArchivo);
  }

  cargarProductosDesdeArchivo(nombreArchivo) {
    const data = fs.readFileSync(nombreArchivo, 'utf8');
    const lineas = data.trim().split('\n');
    for (let i = 0; i < lineas.length; i++) {
      const campos = lineas[i].split('\t');
      const producto = new Producto(campos[0], campos[1], parseFloat(campos[2]), campos[3], parseInt(campos[4]), parseInt(campos[5]), parseInt(campos[6]));
      this.productos.push(producto);
    }
  }

  numeroProductosExistenciaMayorA20() {
    return this.productos.filter(producto => producto.existencia > 20).length;
  }

  numeroProductosExistenciaMenosA15() {
    return this.productos.filter(producto => producto.existencia < 15).length;
  }

  listaProductosMismaClasificacionPrecioMayorA1550() {
    return this.productos.filter(producto => producto.clasificacion === 'A' && producto.precio > 15.50);
  }

  listaProductosPrecioEntre2030Y4500() {
    return this.productos.filter(producto => producto.precio > 20.30 && producto.precio < 45.00);
  }

  numeroProductosAgrupadosPorClasificacion() {
    const clasificaciones = {};
    this.productos.forEach(producto => {
      if (clasificaciones[producto.clasificacion]) {
        clasificaciones[producto.clasificacion]++;
      } else {
        clasificaciones[producto.clasificacion] = 1;
      }
    });
    return clasificaciones;
  }
}

const dao = new DAO('productos.txt');

console.log(`Número de productos con existencia mayor a 20: ${dao.numeroProductosExistenciaMayorA20()}`);
console.log(`Número de productos con existencia menos a 15: ${dao.numeroProductosExistenciaMenosA15()}`);
console.log('Lista de productos con la misma clasificación y precio mayor 15.50:');
console.log(dao.listaProductosMismaClasificacionPrecioMayorA1550());
console.log('Lista de productos con precio mayor a 20.30 y menor a 45.00:');
console.log(dao.listaProductosPrecioEntre2030Y4500());
console.log('Número de productos agrupados por su clasificación:');
console.log(dao.numeroProductosAgrupadosPorClasificacion());
