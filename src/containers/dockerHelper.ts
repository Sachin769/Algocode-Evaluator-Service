import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constant";

export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
    let offset = 0; //This variable keeps track of the current position in the buffer while parsing

    const output: DockerStreamOutput = { stdout: "", stderr: "" };

    while (offset < buffer.length) {


        const typeOfStream = buffer[offset];//reading the first chunk intially get the header first.Inside the chunk have header and value.


        //This length variable hold the length of the value.
        //We will read this variable on an offset of 4 bytes from the start of the chunk.
        const length = buffer.readUint32BE(offset + 4);

        //as now we have read the header, we can move forward to the value of the chunk.
        offset += DOCKER_STREAM_HEADER_SIZE;

        if (typeOfStream === 1) {
            //stdout stream if typeStream is 1
            output.stdout += buffer.toString("utf-8", offset, offset + length);
        }
        if (typeOfStream === 2) {
            //stderr stream if typeStream is 1
            output.stderr += buffer.toString("utf-8", offset, offset + length);
        }
        offset += length;
    }
    return output;
}