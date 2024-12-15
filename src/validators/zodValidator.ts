import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (schema: ZodSchema<any>) => (req: Request, resp: Response, next: NextFunction) => {
    try {
        schema.parse({ ...req.body });
        next();
    } catch (error) {
        console.log("error", error);
        resp.status(400).json({
            message: 'Bad Request'
        });
        return;
    }
};
/*
Think of validate as a "factory" that builds middleware. The middleware itself is what Express calls when processing requests.

The factory (validate):
Takes schema as input.
Returns middleware for validation.
The middleware (returned function):
Accesses req.body for the current request.
Validates it against the schema.
Decides whether to call next() or send an error response.

*/

/*
validate(createSubmissionZodSchema) is executed once at route definition time.
It returns a function (middleware) that will be used for every request to /.
When a request hits the route:
submissionRouter.post("/", validate(createSubmissionZodSchema), addSubmission);
Express invokes the middleware function returned by validate.
The middleware function now has access to req, res, and next.
*/





// If validate doesn't return a function
// export const validate = (schema) => {
//     try {
//         schema.parse(req.body); // Access req.body directly (not possible here!)
//         next();                 // No access to req, res, or next
//     } catch (error) {
//         res.status(400).json({ message: "Bad Request" });
//     }
// };

// req, res, and next are not available when validate is called directly. These are only available when middleware is invoked during a request.

/* 
Middleware functions must have the signature:
(req, res, next) => { ... }
The returned function from validate fits this signature and can access the req, res, and next arguments passed by Express.
*/
