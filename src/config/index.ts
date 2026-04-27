import { env } from "./env";

export const config = {
    app : {
        name : env.APP_NAME,
        port : env.PORT,
        env : env.NODE_ENV
    },

    db: {
        url : env.DATABASE_URL,
    },

    jwt : {
        secret : env.JWT_SECRET,
        expiresIn : env.JWT_EXPIRES_IN
    }
};

