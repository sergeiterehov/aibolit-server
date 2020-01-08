import { ValidationSchema, validationResult, checkSchema } from "express-validator";
import { RequestHandler } from "express";
import { Validator, Schema } from "jsonschema";

export function withValidationSchema(schema: ValidationSchema): RequestHandler {
    return [
        ...checkSchema(schema),
        function schemaMiddleware(req, res, next) {
            if (!validationResult(req).isEmpty()) {
                return res.status(400).send({
                    error: "BAD_REQUEST",
                    errors: validationResult(req).array(),
                });
            }

            next();
        }
    ] as any;
}

export function withSchema(schema: Schema): RequestHandler {
    const validator = new Validator();

    return function (req, res, next) {
        const { errors } = validator.validate(req.body, schema);

        if (!errors.length) {
            return next();
        }

        return res.status(400).send({
            error: "BAD_REQUEST",
            errors: errors.map((error) => error.stack),
        });
    };
}
