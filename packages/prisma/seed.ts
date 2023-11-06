import prisma from ".";
import { createUser } from "./seed-utils";

async function main() {
  await createUser({
    user: {
      email: "delete-me@example.com",
      password: "delete-me",
      username: "delete-me",
      name: "delete-me",
    },
  });
}

main()
  .then(() => {
    // another after user created
    // mainAppStore()
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
