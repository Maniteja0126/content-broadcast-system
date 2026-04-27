import { prisma } from "../../config/prisma";
import { AppError } from "../../common/utils/AppError";

export const getMyProfile = async (
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return user;
};

export const getTeachers = async () => {
  return prisma.user.findMany({
    where: {
      role: "teacher",
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};