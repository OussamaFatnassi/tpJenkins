-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_groupId_fkey`;

-- AlterTable
ALTER TABLE `student` MODIFY `groupId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
