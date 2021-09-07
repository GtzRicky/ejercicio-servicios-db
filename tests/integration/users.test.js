import AcademloDb from "../../services/db.services.js";
import supertest from "supertest"; // Podemos nombrarlo request para identificar que haremos peticiones
import app from '../../app.js';
import faker from 'faker';


    // Hooks de pruebas
    // BeforeEach, BeforeAll, AfterEach, AfterAll

describe("Obtener usuarios", () => {
    // Antes de la prueba:
    // 1. Crear un usuario con datos fake
    // 2. Insertar el usuario en la DB
    // 3. Después de crearlo, guardar el ID
    // 4. Realizar la solicitud de /users/:id con el ID del usuario recién creado
    // 5. Comprobar que los datos que regresa la solicitud sean lo mismos que del usuario
    let newUser = {};
    let id = 0;

    beforeAll(async() => {
        newUser = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email()
        };

        const createdUser = await AcademloDb.create(newUser);
        id = createdUser.id;
    });

    // Después de la prueba
    // 1. Borrar el usuario que se creó en el test de la prueba

    afterAll(async() => {
        await AcademloDb.delete(id);
    })

    it("Debería obtener un arreglo al hacer una petición al recurso de usuarios", async () => {
        const response = await supertest(app).get("/api/v1/users");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });

    it("Debería obtener los datos del usuario que acabo de insertar en la DB", async () => {
        const response = await supertest(app).get(`/api/v1/users/${id}`);

        expect(response.body).toMatchObject(newUser);
    });

});

describe("Probando la creación de usuario", () => {

    let newUser = {};
    let id = 0;

    beforeAll(async() => {
        newUser = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email()
        };
    });

    it("Debería regresar status 201 y el objeto del usuario recién creado", async () => {
        const response = await supertest(app).post(`/api/v1/users`).send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newUser);   //.toHaveProperty("firstname", newUser.firstname)
    });
});