import { request } from "express";
import db from "../services/db.services.js";

export const getUsers = async (request, response, next) => {
    //Obtener la lista de usuarios
    try {
       const users = await db.findAll();
       // Responder al cliente con una respuesta de tipo JSON
        response.json(users);
    } catch (error) {
        // En caso de error, enviar hacia el middleware de manejo de errores
        next(error);
    }
};

export const getUserById = async (request, response, next) => {
    try {
        const {id} = request.params;
        const user = await db.findById(parseInt(id));
        response.json(user);
    } catch (error) {
        next(error);
    }
};

export const createUser = async(request, response, next) => {
    try {
        const {firstname, lastname, email} = request.body;
        const user = await db.create({firstname, lastname, email});
        response.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

