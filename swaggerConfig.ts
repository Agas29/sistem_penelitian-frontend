import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Sistem Penelitian',
            version: '1.0.0',
            description: 'Dokumentasi API Sistem Penelitian',
        },
    },
    apis: ['./app/api/**/*.ts'], // path ke file route-mu yang berisi anotasi swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
