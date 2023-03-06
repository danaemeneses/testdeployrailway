import container from "../containers/containerProductos.js";
const Producto = new container();

export const get = (req, res) => {
    const id = req.params.id;
    if (id) {
        Producto.get(id)
            .then(productos => {
                res.json(productos);
            })
            .catch(err => {
                res.json(err);
            });
    }
    else{
        const usuario = req.user.username
        const saludo = `Bienvenido ${usuario}`
        Producto.get()
            .then(productos => {
                res.render("index", {productos, saludo});
            })
            .catch(err => {
                res.json(err);
            });
    };
};

export const add = (req, res) => {
    const newProducto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    };
    Producto.add(newProducto)
        .then(id => {
            res.json({ id: id }, res.redirect("/productos"));
        })
        .catch(err => {
            res.json(err);
        });
};

export const update = (req, res) => {
    const producto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    };
    Producto.update(req.params.id, producto)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        });
};

export const Delete = (req, res) => {
    Producto.delete( req.params.id)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        });
};