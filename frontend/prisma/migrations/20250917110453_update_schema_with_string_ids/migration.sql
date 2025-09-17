/*
  Warnings:

  - You are about to drop the column `currentPeriodEnd` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastLoginAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `settings` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `WorkflowExecution` table. All the data in the column will be lost.
  - You are about to drop the column `error` on the `WorkflowExecution` table. All the data in the column will be lost.
  - You are about to drop the column `finishedAt` on the `WorkflowExecution` table. All the data in the column will be lost.
  - You are about to drop the column `input` on the `WorkflowExecution` table. All the data in the column will be lost.
  - You are about to drop the column `nodeResults` on the `WorkflowExecution` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `WorkflowExecution` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WorkflowExecution` table. All the data in the column will be lost.
  - The `status` column on the `WorkflowExecution` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ApiKey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Credential` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Integration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkflowVersion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `triggerId` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Made the column `metadata` on table `WorkflowExecution` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."ApiKey" DROP CONSTRAINT "ApiKey_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Credential" DROP CONSTRAINT "Credential_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Usage" DROP CONSTRAINT "Usage_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Workflow" DROP CONSTRAINT "Workflow_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkflowExecution" DROP CONSTRAINT "WorkflowExecution_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkflowExecution" DROP CONSTRAINT "WorkflowExecution_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkflowVersion" DROP CONSTRAINT "WorkflowVersion_workflowId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "currentPeriodEnd",
DROP COLUMN "isActive",
DROP COLUMN "language",
DROP COLUMN "lastLoginAt",
DROP COLUMN "plan",
DROP COLUMN "role",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "subscriptionId",
DROP COLUMN "subscriptionStatus",
DROP COLUMN "theme",
DROP COLUMN "timezone",
ADD COLUMN     "gmailAccessToken" TEXT,
ADD COLUMN     "gmailRefreshToken" TEXT;

-- AlterTable
ALTER TABLE "public"."Workflow" DROP COLUMN "isPublic",
DROP COLUMN "settings",
DROP COLUMN "tags",
DROP COLUMN "version",
ADD COLUMN     "triggerId" TEXT NOT NULL,
ADD COLUMN     "webhookUrl" TEXT,
ALTER COLUMN "nodes" SET DEFAULT '[]',
ALTER COLUMN "edges" SET DEFAULT '[]';

-- AlterTable
ALTER TABLE "public"."WorkflowExecution" DROP COLUMN "duration",
DROP COLUMN "error",
DROP COLUMN "finishedAt",
DROP COLUMN "input",
DROP COLUMN "nodeResults",
DROP COLUMN "startedAt",
DROP COLUMN "userId",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'running',
ALTER COLUMN "metadata" SET NOT NULL;

-- DropTable
DROP TABLE "public"."ApiKey";

-- DropTable
DROP TABLE "public"."AuditLog";

-- DropTable
DROP TABLE "public"."Credential";

-- DropTable
DROP TABLE "public"."Integration";

-- DropTable
DROP TABLE "public"."Notification";

-- DropTable
DROP TABLE "public"."Template";

-- DropTable
DROP TABLE "public"."Usage";

-- DropTable
DROP TABLE "public"."WorkflowVersion";

-- DropEnum
DROP TYPE "public"."ExecutionStatus";

-- DropEnum
DROP TYPE "public"."InvitationStatus";

-- DropEnum
DROP TYPE "public"."NotificationType";

-- DropEnum
DROP TYPE "public"."Plan";

-- DropEnum
DROP TYPE "public"."UserRole";

-- DropEnum
DROP TYPE "public"."WorkspaceRole";

-- CreateTable
CREATE TABLE "public"."Trigger" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "webhookUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Action" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "sortingOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_workflowId_key" ON "public"."Trigger"("workflowId");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableAction_name_key" ON "public"."AvailableAction"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableTrigger_name_key" ON "public"."AvailableTrigger"("name");

-- AddForeignKey
ALTER TABLE "public"."Workflow" ADD CONSTRAINT "Workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "public"."AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trigger" ADD CONSTRAINT "Trigger_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Action" ADD CONSTRAINT "Action_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "public"."AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkflowExecution" ADD CONSTRAINT "WorkflowExecution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
