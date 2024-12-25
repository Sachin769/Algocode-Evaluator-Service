// import Docker from "dockerode";

// import { TestCases } from "../types/testCases";
import { JAVA_IMAGE } from "../utils/constant";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImages from "./pullImages";

async function runJava(code: string, inputTestCase: string) {


    await pullImages(JAVA_IMAGE);


    console.log("instiallizing new java docker container", JAVA_IMAGE);
    const rawLogBuffer: Buffer[] = [];
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE,["python3","-c",code,"stty-echo"]);//"stty-echo: temporalily disable the log of the character you type on the screen"

    //this below command is useful when we run the code like which need to compile first.
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
    console.log(runCommand);
    const javaDockerContainer = await createContainer(JAVA_IMAGE, [
        "bash",
        "-c",
        runCommand
    ]);


    //starting/booting the corresponding docker container
    await javaDockerContainer.start();
    console.log("started the docker container");

    const loggerStream = await javaDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true //whether the logs are streamed or return as a string
    });

    loggerStream.on("data", (chunk) => {
        rawLogBuffer.push(chunk);//every chunk have a header that define what kind of chunk.
    });

    await new Promise((res) => {
        loggerStream.on("end", () => {
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log("decodedStream by java", decodedStream);
            console.log(decodedStream.stdout);
            res(decodedStream);
        });

    });

    //remove the container when done with it   
    await javaDockerContainer.remove();











    // return pythonDockerContainer;
}

export default runJava;