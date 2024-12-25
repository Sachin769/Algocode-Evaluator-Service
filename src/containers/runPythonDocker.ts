// import Docker from "dockerode";

// import { TestCases } from "../types/testCases";
import { PYTHON_IMAGE } from "../utils/constant";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runPython (code: string,inputTestCase:string) {
    console.log("instiallizing new python docker container",PYTHON_IMAGE);
    const rawLogBuffer: Buffer[] = [];
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE,["python3","-c",code,"stty-echo"]);//"stty-echo: temporalily disable the log of the character you type on the screen"

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
    console.log(runCommand);
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE,[
        "bash",
        "-c",
        runCommand
    ]);


    //starting/booting the corresponding docker container
    await pythonDockerContainer.start();
    console.log("started the docker container");

    const loggerStream = await pythonDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true //whether the logs are streamed or return as a string
    });

    loggerStream.on("data",(chunk)=>{
        rawLogBuffer.push(chunk);//every chunk have a header that define what kind of chunk.
    });

    await new Promise((res)=>{
        loggerStream.on("end",()=>{
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log("decodedStream",decodedStream);
            console.log(decodedStream.stdout);
            res(decodedStream);
        });

    });

    //remove the container when done with it   
    await pythonDockerContainer.remove();











    // return pythonDockerContainer;
}

export default runPython;