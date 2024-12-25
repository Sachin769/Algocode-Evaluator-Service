// import Docker from "dockerode";

// import { TestCases } from "../types/testCases";
import { CPP_IMAGE } from "../utils/constant";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImages from "./pullImages";

async function runCpp(code: string, inputTestCase: string) {

    await pullImages(CPP_IMAGE);


    console.log("instiallizing new cpp docker container", CPP_IMAGE);
    const rawLogBuffer: Buffer[] = [];
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE,["python3","-c",code,"stty-echo"]);//"stty-echo: temporalily disable the log of the character you type on the screen"

    //this below command is useful when we run the code like which need to compile first.
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | stdbuf -oL -eL ./main`;
    console.log(runCommand);
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
        "bash",
        "-c",
        runCommand
    ]);


    //starting/booting the corresponding docker container
    await cppDockerContainer.start();
    console.log("started the docker container");

    const loggerStream = await cppDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true //whether the logs are streamed or return as a string
    });

    loggerStream.on("data", (chunk) => {
        rawLogBuffer.push(chunk);//every chunk have a header that define what kind of chunk.
    });

    const response = await new Promise((res) => {
        loggerStream.on("end", () => {
            console.log("buffer by cpp", rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log("decodedStream by cpp", decodedStream);
            console.log(decodedStream.stdout);
            res(decodedStream);
        });

    });

    //remove the container when done with it   
    await cppDockerContainer.remove();
    return response;











    // return pythonDockerContainer;
}

export default runCpp;