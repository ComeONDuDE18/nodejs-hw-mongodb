import { setupServer } from "./server.js";
import { initMongoDB } from "./db/initMongoDB.js";


const bootstrap = async () => {
    try {
        await initMongoDB();
        setupServer();

    } catch (error) {
        console.error(error);
    }
};

bootstrap().catch((error) => console.error(error));