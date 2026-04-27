import { AppError } from "../../common/utils/AppError";
import { prisma } from "../../config/prisma";

export const getPendingContents = async () => {
  return prisma.content.findMany({
    where: {
      status: "pending",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const approveContentById = async (
  contentId: string,
  principalId: string
) => {
  const content = await prisma.content.findUnique({
    where: { id: contentId },
  });

  if (!content) {
    throw new AppError("Content not found" , 404);
  }

  if (content.status !== "pending") {
    throw new AppError("Only pending content can be approved" , 409);
  }

  return prisma.content.update({
    where: { id: contentId },
    data: {
      status: "approved",
      approvedById: principalId,
      approvedAt: new Date(),
      rejectionReason: null,
    },
  });
};

export const rejectContentById = async (
  contentId: string,
  principalId: string,
  reason: string
) => {
  const content = await prisma.content.findUnique({
    where: { id: contentId },
  });

  if (!content) {
    throw new AppError("Content not found" , 404);
  }

  if (content.status !== "pending") {
    throw new AppError("Only pending content can be rejected",409);
  }

  return prisma.content.update({
    where: { id: contentId },
    data: {
      status: "rejected",
      approvedById: principalId,
      approvedAt: new Date(),
      rejectionReason: reason,
    },
  });
};


export const getAllContents = async (
  filters: {
    status?: string;
    subject?: string;
    teacherId?: string;
  }
) => {
  return prisma.content.findMany({
    where: {
      ...(filters.status
        ? { status: filters.status as any }
        : {}),

      ...(filters.subject
        ? { subject: filters.subject }
        : {}),

      ...(filters.teacherId
        ? {
            uploadedById:
              filters.teacherId,
          }
        : {}),
    },

    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};