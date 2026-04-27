import { prisma } from "../../config/prisma";

type Params = {
  teacherId: string;
  subject?: string;
};

export const getLiveContent = async ({
  teacherId,
  subject,
}: Params) => {
  const now = new Date();

  const contents = await prisma.content.findMany({
    where: {
      uploadedById: teacherId,
      status: "approved",
      startTime: {
        not: null,
        lte: now,
      },
      endTime: {
        not: null,
        gte: now,
      },
      ...(subject?.trim()
        ? {
            subject: {
              equals: subject.trim(),
              mode: "insensitive",
            },
          }
        : {}),
    },
    orderBy: {
      createdAt: "asc",
    },
  });


  if (!contents.length) {
    return null;
  }

  const valid = contents.filter(
    (item) =>
      item.rotationDurationMin !== null &&
      item.rotationDurationMin > 0
  );



  if (!valid.length) {
    return null;
  }

  const totalCycle = valid.reduce(
    (sum, item) =>
      sum + item.rotationDurationMin!,
    0
  );

  const anchor = valid[0].startTime || valid[0].createdAt;

  const elapsedMs = now.getTime() - anchor.getTime();

  const elapsedMin = Math.floor(
    elapsedMs / 60000
  );

  const pointer = ((elapsedMin % totalCycle) + totalCycle) % totalCycle;

  let running = 0;

  for (const item of valid) {
    running +=
      item.rotationDurationMin!;

    if (pointer < running) {
      return item;
    }
  }

  return valid[0];
};