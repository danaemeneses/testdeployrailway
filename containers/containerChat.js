import mongoose from "mongoose";
import modelsChat from "../models/modelsChat.js";
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

    async getChat(){
        const data = await modelsChat.find({}, {_id:0, __v:0});
        return data;
    };

    async addChat(data){
        const dataAdd = new modelsChat(data);
        const add = await dataAdd.save();
        return add;
    };

};