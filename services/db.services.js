import fs from "fs/promises";
import path from "path";
import faker from "faker";

class AcademloDb {

    static dbPath = path.resolve("db", "db.json");

    static findAll = async() => {
        try{
            let data = await fs.readFile(this.dbPath, "utf8");
            return JSON.parse(data);
        }catch(error){
            throw new Error("Hubo un error al tratar de obtener todos los registros de la DB");
        }
    }

    static findById = async(id) => {
        try {
            let data = await fs.readFile(this.dbPath, "utf8");
            let users = JSON.parse(data);
            return users.find(user => user.id === id);
        } catch (error) {
            throw new Error("No pudimos encontrar el usuario en la DB");
        }
    }

    static create = async (obj, id) => {
        try {
            let data = await this.findAll();
            let newID = data.length + 1;
            let newUser = obj;
            newUser.id = newID;

            data.push(newUser);
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            return newUser;
        } catch (error) {
            throw new Error("No se pudo crear un nuevo registro en la DB");
        }
    }

    static update = async (obj, id) => {
        try {
            let findUser = await this.findById(id);
            if(!findUser) {
                throw new Error("No se encontró el usuario con el ID indicado"); 
            }
            let updatedUser = findUser.splice(1, findUser.length - 1, ...obj);
            await fs.writeFile(this.dbPath, JSON.stringify(updatedUser));
            return updatedUser;
        }catch(error) {
            throw new Error("No se pudo actualizar el registro");
        }
    }

    static delete = async(id) => {
        try {
            let data = await this.findAll();
            let index = data.findIndex(user => user.id === id);
            if (index === -1) {
                return false
            }
            data.splice(index, 1);
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            return true;
        } catch (error) {
            throw new Error;
        }
    }

    static clear = async() => {
        try{
            await fs.writeFile(this.dbPath, JSON.stringify([]));
        }catch(error){
            throw new Error("Hubo un error al tratar de vaciar la DB");
        }
    }

    static populateDB = async(size) => {
        let userArr = [];
        for(let i = 0; i<size; i++){
            let userObj = {
                id: i + 1,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email().toLowerCase()
            };

            userArr.push(userObj);
        }

        try{
            await fs.writeFile(this.dbPath, JSON.stringify(userArr));
            return userArr;
        }catch(error){
            throw new Error("Hubo un error al insertar en la base de datos");
        }
    }

}

export default AcademloDb;