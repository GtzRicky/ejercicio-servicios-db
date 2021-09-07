import { Router } from 'express';
import { getUsers, getUserById, createUser } from '../controllers/users.controller.js';
// Middleware enrutador (router)

const routes = Router();

// GET, POST, PUT, DELETE
routes.get("/users", getUsers);
routes.get("/users/:id", getUserById);
routes.post("/users", createUser);
routes.put("/users/:id");
routes.delete("/users/:id");

export default routes;