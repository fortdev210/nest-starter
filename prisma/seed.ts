import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  // create two dummy users for testing purpose
  const user = await prisma.user.create({
    data: {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(20),
      is_email_verified: true,
    },
  });
}

main()
  .catch((e) => process.exit(1))
  .finally(async () => await prisma.$disconnect());
