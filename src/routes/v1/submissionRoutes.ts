import express from "express";

import { addSubmission } from "../../controllers/submissionController";
import { createSubmissionZodSchema } from "../../dtos/createSubmissionDtos";
import { validate } from "../../validators/zodValidator";


const submissionRouter = express.Router();

/*
At runtime (when the app starts), this generates a middleware function using the provided schema.
The returned middleware function validates the req.body during the request lifecycle.
When a POST request hits /, Express invokes the middleware functions in order:
The middleware returned by validate(createSubmissionZodSchema) is executed first.
If the validation passes, next() is called, and the control moves to the addSubmission route handler.
*/
submissionRouter.post("/",validate(createSubmissionZodSchema),addSubmission);

/*
validate(createSubmissionZodSchema) is called once when the server starts.
It returns a middleware function, which is passed to submissionRouter.post.
*/

// ***** Think of validate(createSubmissionZodSchema) as a chef creating a dish (middleware). The actual "dish" (middleware function) is what is served during a request.****


export default submissionRouter;
