import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import {errorHandler} from './middlewares/errorHandler.js';
import {notFoundHandler} from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';



import router from './routers/index.js';


const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api-docs', swaggerDocs());

 app.use('/uploads', express.static(UPLOAD_DIR));

app.use(
    pino({
        transport: {
            target: 'pino-pretty',
        }
    })
);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Contacts API',
    });
});


app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}
