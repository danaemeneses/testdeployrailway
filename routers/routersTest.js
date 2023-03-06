import { Router } from "express";
import  { faker } from"@faker-js/faker";
faker.locale = "es";

const productosTest = Router();

productosTest.get("/", (req, res) => {
    let productos = [];
    for (let i = 0; i < 6; i++) {
        productos.push(crearProducto(i+1));
    }

    res.render("test", {productos});
});

function crearProducto(id) {
    return {
        id: id, 
        nombre: faker.commerce.product(),
        descripcion: faker.commerce.product(),
        codigo: faker.commerce.product(),
        precio: faker.commerce.price(),
        stock: faker.commerce.price(),
        foto: faker.image.abstract(),
    };
};

export default productosTest;