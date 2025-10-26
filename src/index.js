import { setupServer } from "./server.js";
import { initMongoDB } from "./db/initMongoDB.js";
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';



const bootstrap = async () => {
    try {
        await initMongoDB();
        await createDirIfNotExists(TEMP_UPLOAD_DIR);
        await createDirIfNotExists(UPLOAD_DIR);
        setupServer();

    } catch (error) {
        console.error(error);
    }
};

void bootstrap().catch((error) => console.error(error));
