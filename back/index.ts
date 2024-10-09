import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllStudents = async () => {
  const students = await prisma.student.findMany();
  return students;
};

const getStudentsByGroup = async (groupId: number) => {
  const students = await prisma.student.findMany({
    where: {
      groupId,
    },
  });
  return students;
};

const getGrouplessStudents = async () => {
  const students = await prisma.student.findMany({
    where: {
      groupId: null,
    },
  });
  return students;
};

Bun.serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    let result;

    if (pathname === "/students") {
      result = await getAllStudents();
    } else if (pathname === "/students/groupless") {
      result = await getGrouplessStudents();
    } else if (pathname === "/students/group") {
      const groupId = url.searchParams.get("groupId");
      if (groupId) {
        result = await getStudentsByGroup(parseInt(groupId));
      }
    }

    if (result) {
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response("Not Found", { status: 404 });
    }
  },
});
