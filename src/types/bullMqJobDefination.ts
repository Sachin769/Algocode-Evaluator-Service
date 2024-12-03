import { Job } from "bullmq";

export interface IJob{
    name: string,
    payload?:Record<string,unknown>,
    handle: (job?:Job) => void
    failed: (job?:Job) => void
}




















/*
The interface keyword is used in TypeScript to define contracts for objects, classes, or functions. It helps provide static type-checking during
development.It is a TypeScript-only feature and gets erased during the TypeScript-to-JavaScript compilation process because JavaScript has 
no equivalent concept.
*/