import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { prisma, server } from '../index';

// Mock data setup
beforeAll(async () => {
  // Insert test data for students
  await prisma.student.createMany({
    data: [
      { id: 1, name: "Alice", groupId: 1 },
      { id: 2, name: "Bob", groupId: null },
      { id: 3, name: "Charlie", groupId: 1 },
    ],
  });
});

// Clean up after tests
afterAll(async () => {
  await prisma.student.deleteMany();
  await prisma.$disconnect();
});

describe("API Tests", () => {
  it("should fetch all students", async () => {
    const response = await fetch("http://localhost:3000/students");
    const students = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(students)).toBe(true);
    expect(students.length).toBe(3);
  });

  it("should fetch students by group", async () => {
    const response = await fetch("http://localhost:3000/students/group?groupId=1");
    const students = await response.json();

    expect(response.status).toBe(200);
    expect(students.length).toBe(2);
    expect(students.some((student: any) => student.name === "Alice")).toBe(true);
    expect(students.some((student: any) => student.name === "Charlie")).toBe(true);
  });

  it("should fetch groupless students", async () => {
    const response = await fetch("http://localhost:3000/students/groupless");
    const students = await response.json();

    expect(response.status).toBe(200);
    expect(students.length).toBe(1);
    expect(students[0].name).toBe("Bob");
  });

  it("should return 404 for invalid endpoint", async () => {
    const response = await fetch("http://localhost:3000/invalid-endpoint");

    expect(response.status).toBe(404);
  });
});
