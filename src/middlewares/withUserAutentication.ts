import { User } from "../models/User";
import { RequestHandler } from "express";
import { services } from "../services";

const byJWT: RequestHandler = async (req, res, next) => {
    if (req.user) {
        return next();
    }

    const accessToken = String(req.headers["x-access-token"] || req.headers["authorization"] || "");

    if (!accessToken) {
        return next();
    }

    const userId = services.auth.verifyAccessToken(accessToken);

    if (userId === undefined) {
        return next();
    }

    const user = (await User.findOne({where: {id: userId}}));

    if (!user) {
        return next();
    }

    req.user = user;

    next();
};

const byDevelopBody: RequestHandler = async (req, res, next) => {
    if (req.user) {
        return next();
    }

    const email = req.body && req.body.email;

    if (!email) {
        return next();
    }

    const user = (await User.findOne({where: {email}})) || (await User.create({email}));

    if (!user) {
        return next();
    }

    req.user = user;

    next();
};

const authErrorHandler: RequestHandler = async (req, res, next) => {
    if (req.user) {
        return next();
    }

    res.status(403).send({error: "AUTHENTICATION_REQUIRED"});
}

export const withUserAutentication: RequestHandler = [
    byJWT,
    byDevelopBody,
    authErrorHandler,
] as any;
