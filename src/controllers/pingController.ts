import { Request,Response } from "express";

export const pingCheck = (_:Request,resp:Response) => {
    console.log("Ping is Connected");
    resp.status(200).json({
        message:"Ping Done"
    });
    return ;
};
