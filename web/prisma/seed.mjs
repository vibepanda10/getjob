import { PrismaClient, RoleMode, SwipeAction } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const helper = await prisma.user.upsert({
    where: { email: "helper@getthatjob.dev" },
    update: {},
    create: {
      email: "helper@getthatjob.dev",
      profile: {
        create: {
          displayName: "Blue Fox",
          anonymousAlias: "Helper-BlueFox",
          roleMode: RoleMode.HELPER,
          linkedinUrl: "https://linkedin.com/in/bluefox",
          helperRevealOptIn: false,
          countryCode: "CZ",
          timezone: "Europe/Prague",
        },
      },
      creditsWallet: {
        create: {
          balance: 60,
          freePostClaimed: true,
          weeklyInterestUsed: 1,
        },
      },
    },
  });

  const seeker = await prisma.user.upsert({
    where: { email: "seeker@getthatjob.dev" },
    update: {},
    create: {
      email: "seeker@getthatjob.dev",
      profile: {
        create: {
          displayName: "Nova Nine",
          anonymousAlias: "Seeker-Nova9",
          roleMode: RoleMode.SEEKER,
          linkedinUrl: "https://linkedin.com/in/novanine",
          countryCode: "CZ",
          timezone: "Europe/Prague",
        },
      },
      creditsWallet: {
        create: {
          balance: 0,
          freePostClaimed: false,
          weeklyInterestUsed: 0,
        },
      },
    },
  });

  await prisma.swipe.upsert({
    where: { fromUser_toUser: { fromUser: seeker.id, toUser: helper.id } },
    update: { action: SwipeAction.INTERESTED },
    create: {
      fromUser: seeker.id,
      toUser: helper.id,
      action: SwipeAction.INTERESTED,
    },
  });

  await prisma.swipe.upsert({
    where: { fromUser_toUser: { fromUser: helper.id, toUser: seeker.id } },
    update: { action: SwipeAction.INTERESTED },
    create: {
      fromUser: helper.id,
      toUser: seeker.id,
      action: SwipeAction.INTERESTED,
    },
  });

  const [userAId, userBId] = [helper.id, seeker.id].sort();
  const match = await prisma.match.upsert({
    where: { userAId_userBId: { userAId, userBId } },
    update: {},
    create: {
      userAId,
      userBId,
      messages: {
        create: {
          senderId: helper.id,
          body: "Happy to help — share the role and I can guide your prep.",
        },
      },
    },
  });

  console.log(`Seed completed. Match created: ${match.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
