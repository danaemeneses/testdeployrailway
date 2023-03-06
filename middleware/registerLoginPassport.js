import container from "../containers/containerUsuario.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bCrypt from "bcrypt";

const dbUsuario = new container();

export const register = new LocalStrategy({
    passReqToCallback: true,
}, async (req, username, password, done) => {

    const { name } = req.body;
    const usuario = await dbUsuario.getUsuario(username);

    if (usuario) {
        return done("El usuario ya esta registrado", false);
    }

    const newUser = {
        username,
        password: createHash(password),
        name,
    };

    dbUsuario.addUsuario(newUser);

    done(null, newUser);
});

export const login = new LocalStrategy(async (username, password, done) => {

    const usuario = await dbUsuario.getUsuario(username);

    if (!usuario) {
        return done("No existe el usuario", false);
    };

    if (!isValidPassword(usuario, password)) {
        return done("Contraseña incorrecta", false)
    };

    return done(null, usuario);
});

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const usuario = await dbUsuario.getUsuario(username);
    done(null, usuario);
});

function createHash(password) {
    return bCrypt.hashSync( password, bCrypt.genSaltSync(10), null );
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}