import { Request, Response } from "express";

import { CreateSubmissionDto } from "../dtos/createSubmissionDtos";

export function addSubmission(req: Request, resp: Response) {
    const submissionDto = req.body as CreateSubmissionDto;

    resp.status(201).json({
        success: true,
        error: {},
        message: "Successfully Collected the Submission",
        data: submissionDto
    });
}