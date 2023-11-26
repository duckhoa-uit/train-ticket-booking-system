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
  await createUser({
    user: {
      email: "admin@example.com",
      password: "Admin@123",
      username: "admin",
      name: "Admin Example",
      role: "ADMIN",
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
