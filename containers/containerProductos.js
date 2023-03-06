import mongoose from "mongoose";
import modelsProductos from "../models/models.js";
import dotenv from 'dotenv';

dotenv.config()
const dataBase = process.env.MONGOCONNECT
const urlPars = process.env.URLPARS
const unified = process.env.UNIFIED

try {
    await mongoose.connect(dataBase, {
        useNewUrlParser: urlPars,
        useUnifiedTopology: unified,
    });
    mongoose.set('strictQuery', false);
    console.log('Conectado a la base de datos');
} catch (error) {
    console.error(error);
}


export default class Container {

    async add(data){
        const dataAdd = new modelsProductos(data);
        const add = await dataAdd.save();
        return add;
    };

    async get(id){
        if (id) {
            const data = await modelsProductos.findById(id);
            return data;
        }
        else{
            const data = await modelsProductos.find();
            return data;
        }
    };

    async update(id, data){
        const update = await modelsProductos.updateOne({_id: id}, data);
        return update;
    };
    
    async delete(id){
        const deelete = await modelsProductos.deleteOne({_id : id});
        return deelete;
    };

};