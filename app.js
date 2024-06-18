import express from "express";
import "dotenv/config";
import routes from "./src/routes/index.js";
import response from "./src/io/response.js";
import Server from "./server.js";
import cors from "cors";
import onFinished from "on-finished";


const app = express();
const port = process.env.PORT || "3000";

const server = new Server();
const logger = server.getlogger();

await server.init()
    .then(() => {
        app.use(cors());
        app.use(express.json())
        app.use(express.urlencoded({extended:true}));
        app.use(server.attachLogger);
        app.use((req, res, next) => {
            req.startTime = Date.now();
            onFinished(res, () => {
                const endTime = Date.now();
                const elapsedTime = endTime - req.startTime;
                req.log.info(`Request executed in ${elapsedTime}ms`);
            });
            next();
        });
        app.use("/", routes);
        app.use(response);

        app.listen(port, () => {
            logger.info(`server listening on port ${port}`);
        });
    })
    .catch(async (error) => {
        throw error;
    }).finally(async ()=> {

    })

process.on("uncaughtException", async()=>{
    
})

process.on("SIGTERM", async()=>{
    await shutDown();
})

process.on("SIGINT", async()=>{
    await shutDown();
})

const shutDown = async()=>{
    try{
        await server.close();
        logger.info("successfully shutting down");
        process.exit(0);
    }catch(e){
        logger.error("error while shutting down");
        process.exit(1);
    }
}
