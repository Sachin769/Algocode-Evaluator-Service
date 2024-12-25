
import bodyParser from "body-parser";
import express, { Express } from "express";

import bullBoardUi from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import runPython from "./containers/runPythonDocker";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/sampleWorker";


const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());



app.use("/api", apiRouter);
app.use("/ui", bullBoardUi.getRouter());

app.listen(serverConfig.PORT, () => {
    console.log("Server is Up with Port: ", serverConfig.PORT);
    console.log(`BullBoard dashboard UI is running on: http://localhost:${serverConfig.PORT}/ui`);
    SampleWorker("SampleQueue");
    sampleQueueProducer("SampleJob", {
        name: "Sachin",
        company: "Corewave",
        position: "Nodejs Developer",
        location: "Rohini Sector 7"
    });
    sampleQueueProducer("SampleJob", {
        name: "Ashu",
        company: "Corewave",
        position: "Nodejs Developer",
        location: "Rohini Sector 7"
    });
    const code = `x=input()
y=input()
print("value of x is",x)
print("value of y is",y)

    `;
    const inputCase = `100
200`;
    runPython(code, inputCase);

});