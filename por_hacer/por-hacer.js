const fs = require('fs');

let listadoToDo = [];

const getListadoToDo = () => {
    cargarData();
    return listadoToDo;
}

const crear = (descripcion) => {
    cargarData();
    let toDo = {
        descripcion,
        completado: false
    }

    listadoToDo.push(toDo);
    persistenceData(listadoToDo);

    return toDo;
}

const actualizar = (descripcion, estado) => {
    cargarData();
    let index = listadoToDo.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoToDo[index].completado = (estado == 'true');
        persistenceData();
        return true;
    }

    return false;
}

const borrar = (descripcion) => {
    cargarData();
    let nuevoListado = listadoToDo.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevoListado.length === listadoToDo.length) {
        return false;
    } else {
        listadoToDo = nuevoListado;
        persistenceData();
        return true;
    }

}

const persistenceData = () => {

    let data = JSON.stringify(listadoToDo);

    fs.writeFile('BBDD/data.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

}

const cargarData = () => {
    try {
        listadoToDo = require('../BBDD/data.json');
    } catch (err) {
        listadoToDo = [];
    }
}

module.exports = {
    crear,
    getListadoToDo,
    actualizar,
    borrar
}