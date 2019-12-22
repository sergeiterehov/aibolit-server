import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";

export class AuthService {
    private secretKey = "AUTH_SECRET_KEY";

    generateAccessToken(userId: number) {
        return jwt.sign({
            u: userId,
            e: moment().add(30, "days").unix(),
        }, this.secretKey);
    }

    verifyAccessToken(token: string): number | undefined {
        try {
            const body = this.parseAccessToken(token);

            if (!moment().isBefore(body.expiredAt)) {
                return;
            }

            return body.userId;
        } catch (e) {
            return;
        }
    }

    parseAccessToken(token: string): {
        userId: number;
        createdAt: Moment;
        expiredAt: Moment;
    } {
        const data = jwt.verify(token, this.secretKey) as any;

        if (typeof data === "string") {
            throw new Error("BAD_TOKEN");
        }

        return {
            userId: data.u,
            createdAt: moment.unix(data.iat),
            expiredAt: moment.unix(data.e),
        };
    }
}
