import { RequestHandler } from "express";

export class HttpError extends Error {
    constructor (message?: string, public httpStatus: number = 500) {
        super(message);
    }
}

export class ServerHttpError extends HttpError {
    constructor(message?: string) {
        super(message, 500);
    }
}

export class RequestHttpError extends HttpError {
    constructor(message?: string) {
        super(message, 400);
    }
}

export class AuthHttpError extends HttpError {
    constructor(message?: string) {
        super(message, 401);
    }
}

export class AccessHttpError extends HttpError {
    constructor(message?: string) {
        super(message, 403);
    }
}

export const withErrorHandler = (methodHandler: RequestHandler): RequestHandler => {
    return async function methodWithErrorHandler(req, res, next) {
        try {
            await new Promise(async (resolve, reject) => {
                try {
                    await methodHandler(req, res, resolve);
                } catch (e) {
                    reject(e);
                }
            });
        } catch (e) {
            if (e instanceof HttpError) {
                return res.status(e.httpStatus).send({error: e.message || "UNKNOWN_ERROR"});
            }

            if (e instanceof Error) {
                return res.status(500).send({error: e.message || "UNKNOWN_ERROR"});
            }

            return res.status(500).send({error: String(e || "UNKNOWN_ERROR")});
        }

        next();
    }
};
