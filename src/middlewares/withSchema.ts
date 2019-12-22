import { ValidationSchema, validationResult, checkSchema } from "express-validator";
import { RequestHandler } from "express";

export function withSchema(schema: ValidationSchema): RequestHandler {
    return [
        ...checkSchema(schema),
        function schemaMiddleware(req, res, next) {
            if (!validationResult(req).isEmpty()) {
                return res.status(400).send(validationResult(req).array());
            }

            next();
        }
    ] as any;
}
