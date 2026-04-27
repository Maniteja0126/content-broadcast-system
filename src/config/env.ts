import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();


const schema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV : z.string().default("development"),

    DATABASE_URL : z.string(),
    JWT_SECRET : z.string(),
    JWT_EXPIRES_IN: z.coerce.number().default(86400),
    APP_NAME : z.string().default("content-broadcast-system") 
});

const parsed = schema.safeParse(process.env);


if(!parsed.success) {
    console.error("Invalid environment variables");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data;
