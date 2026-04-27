import { prisma } from "../../config/prisma";

type CreateInput = {
    title: string;
    subject: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
    rotationDurationMin?: number;
    filePath: string;
    fileType: string;
    fileSize: number;
    uploadedById: string;
};


export const createContent = async (data: CreateInput) => {

    return prisma.content.create({
  
      data: {
        title: data.title,
        subject: data.subject,
        description: data.description,
        startTime: data.startTime ? new Date(data.startTime) : null,
        endTime: data.endTime ? new Date(data.endTime) : null,
        rotationDurationMin: data.rotationDurationMin ?? null,
        filePath: data.filePath,
        fileType: data.fileType,
        fileSize: data.fileSize,
        uploadedById: data.uploadedById,
        status: "pending",
      },
    });
  
};


export const getMyContents = async (
  userId: string
) => {
  return prisma.content.findMany({
    where: {
      uploadedById: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

  
  