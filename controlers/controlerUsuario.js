export const getSignIn = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/productos");
    };
    res.render("ingresar");
};

export const getSignUp = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/productos");
    };
    res.render("registrarse");
};

export const getLogout = (req, res) => {
    const usuario = req.user.username;
    req.logout(err => {
        const saludo = `Hasta luego ${usuario}`;
        res.render("Saludo", {saludo});
    });
};