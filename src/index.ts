
import express, { Express } from "express";

import bullBoardUi from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/sampleWorker";


const app: Express = express();


app.use("/api", apiRouter);
app.use("/ui", bullBoardUi.getRouter());

app.listen(serverConfig.PORT, () => {
    console.log("Sachin Pathak:", serverConfig.PORT);
    console.log(`BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`);
    SampleWorker("SampleQueue");
    sampleQueueProducer("SampleJob", {
        name: "Sachin",
        company: "Corewave",
        position: "Nodejs Developer",
        location: "Rohini Sector 7"
    });
});