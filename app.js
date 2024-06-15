import express from "express";
import 'dotenv/config';
import routes from "./src/routes/index.js";
import response from "./src/io/response.js";

const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());
app.use('/', routes);
app.use(response);
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
});

export default app;