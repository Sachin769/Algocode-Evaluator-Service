export const PYTHON_IMAGE = "python";
export const JAVA_IMAGE = "openjdk:11-jdk-slim";
export const CPP_IMAGE = "gcc:latest"; //if don't exit then use docker pull gcc:latest command
export const submission_queue = "SubmissionQueue";


//This will represent the header size of docker stream.
//docker stream header will contain data about type of stream i.e. stdout/stderr
//and length of the data
export const DOCKER_STREAM_HEADER_SIZE = 8;
