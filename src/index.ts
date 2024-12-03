
import express,{Express} from "express";

import serverConfig from "./config/serverConfig";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/sampleWorker";


const app:Express = express();


app.use("/api",apiRouter);

app.listen(serverConfig.PORT,()=>{
    console.log("Sachin Pathak:",serverConfig.PORT);
    SampleWorker("SampleQueue");
    sampleQueueProducer("SampleJob",{
        name: "Sachin",
        company: "Corewave",
        position: "Nodejs Developer",
        location: "Rohini Sector 7"
    });
});