import express from "express";
import 'dotenv/config';
import routes from "./src/routes/index.js";
import response from "./src/io/response.js";
import Server from "./server.js";

const app = express();
const port = process.env.PORT || '3000';

const server = new Server();
await server.init()
    .then(() => {
        app.use(express.json());
        app.use('/', routes);
        app.use(response);
        app.listen(port, () => {
            console.log(`server listening on port ${port}`);
        });
    })
    .catch(async (error) => {
        throw error;
    }).finally(async ()=> {

    })

process.on('uncaughtException', async()=>{
    
})

process.on('SIGTERM', async()=>{
    await shutDown();
})

process.on('SIGINT', async()=>{
    await shutDown();
})

const shutDown = async()=>{
    try{
        await server.close();
        console.log("successfully shutting down");
        process.exit(0);
    }catch(e){
        console.log("error while shutting down");
        process.exit(1);
    }
}
