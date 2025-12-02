-- CreateTable
CREATE TABLE "User" (
    "uid" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "position" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Project" (
    "pid" SERIAL NOT NULL,
    "pName" TEXT NOT NULL,
    "pDateStart" TIMESTAMP(3),
    "pDateEnd" TIMESTAMP(3),
    "pDateCompleted" TIMESTAMP(3),
    "pStatus" TEXT,
    "pDescription" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "projectEmployee" (
    "uid" INTEGER NOT NULL,
    "pid" INTEGER NOT NULL,
    "date" TIMESTAMP(3),

    CONSTRAINT "projectEmployee_pkey" PRIMARY KEY ("uid","pid")
);

-- CreateTable
CREATE TABLE "task" (
    "tid" SERIAL NOT NULL,
    "tTitle" TEXT NOT NULL,
    "tType" TEXT,
    "tDescription" TEXT,
    "tDateCreate" TIMESTAMP(3),
    "tDateStart" TIMESTAMP(3),
    "tDateCommit" TIMESTAMP(3),
    "tDateDue" TIMESTAMP(3),
    "tStatus" TEXT,
    "tPriority" TEXT,
    "pid" INTEGER,
    "cid" INTEGER,

    CONSTRAINT "task_pkey" PRIMARY KEY ("tid")
);

-- CreateTable
CREATE TABLE "taskAssign" (
    "uid" INTEGER NOT NULL,
    "tid" INTEGER NOT NULL,
    "date_assign" TIMESTAMP(3),

    CONSTRAINT "taskAssign_pkey" PRIMARY KEY ("uid","tid")
);

-- CreateTable
CREATE TABLE "Comment" (
    "cmid" SERIAL NOT NULL,
    "cmDetail" TEXT NOT NULL,
    "cmCreate" TIMESTAMP(3),
    "cmUpdate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "uid" INTEGER,
    "tid" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("cmid")
);

-- CreateTable
CREATE TABLE "userComment" (
    "uid" INTEGER NOT NULL,
    "cmid" INTEGER NOT NULL,

    CONSTRAINT "userComment_pkey" PRIMARY KEY ("uid","cmid")
);

-- CreateTable
CREATE TABLE "column" (
    "cid" SERIAL NOT NULL,
    "cName" TEXT NOT NULL,
    "cIndex" INTEGER,

    CONSTRAINT "column_pkey" PRIMARY KEY ("cid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "projectEmployee" ADD CONSTRAINT "projectEmployee_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectEmployee" ADD CONSTRAINT "projectEmployee_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Project"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Project"("pid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_cid_fkey" FOREIGN KEY ("cid") REFERENCES "column"("cid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskAssign" ADD CONSTRAINT "taskAssign_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskAssign" ADD CONSTRAINT "taskAssign_tid_fkey" FOREIGN KEY ("tid") REFERENCES "task"("tid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tid_fkey" FOREIGN KEY ("tid") REFERENCES "task"("tid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userComment" ADD CONSTRAINT "userComment_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userComment" ADD CONSTRAINT "userComment_cmid_fkey" FOREIGN KEY ("cmid") REFERENCES "Comment"("cmid") ON DELETE RESTRICT ON UPDATE CASCADE;
