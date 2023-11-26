-- CreateEnum
CREATE TYPE "IdentityProvider" AS ENUM ('INTERNAL', 'GOOGLE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "identityProvider" "IdentityProvider" NOT NULL DEFAULT 'INTERNAL',
ADD COLUMN     "identityProviderId" TEXT;
