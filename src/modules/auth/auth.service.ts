import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";
import { signAccessToken } from "../../common/utils/jwt";
import { AppError } from "../../common/utils/AppError";

export const registerTeacher = async (
    name : string,
    email :string,
    password : string
) => {
    const existing = await prisma.user.findUnique({
        where :{email}
    });

    if(existing) {
        throw new AppError("Email already exists",409);
    }

    const passwordHash = await bcrypt.hash(password , 10);

    const user = await prisma.user.create({
        data : {
            name , 
            email , 
            passwordHash,
            role : 'teacher'
        },
        select: {
            id: true,
            name: true,     
            email: true,
            role: true,
            createdAt: true,
        },
    });
    return user;
}


export const loginUser = async (email : string , password : string) => {
    const user = await prisma.user.findUnique({
        where : {email}
    });

    if(!user) throw new AppError("User not found" , 404);

    const valid = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if(!valid) {
        throw new AppError("Invalid credentials" , 401);
    }

    const token = signAccessToken({
        sub : user.id,
        role : user.role,
        email : user.email
    });

    return {user , token};
}