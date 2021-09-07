export const errorHandler = (error, request, response, next) => {
    response.status(400).json({
        message: "Hubo un eeoe al procesar la solicitud",
        errors: error.message
    });
};
