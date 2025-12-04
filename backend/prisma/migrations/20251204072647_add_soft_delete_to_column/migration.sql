-- DropForeignKey
ALTER TABLE "userComment" DROP CONSTRAINT "userComment_cmid_fkey";

-- DropForeignKey
ALTER TABLE "userComment" DROP CONSTRAINT "userComment_uid_fkey";

-- AlterTable
ALTER TABLE "column" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "userComment" ADD CONSTRAINT "userComment_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userComment" ADD CONSTRAINT "userComment_cmid_fkey" FOREIGN KEY ("cmid") REFERENCES "Comment"("cmid") ON DELETE CASCADE ON UPDATE CASCADE;
