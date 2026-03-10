export const CREDIT_POLICY = {
  freeTier: {
    firstHelperPostFree: true,
    freeInterestsPerWeek: 5,
    maxActiveMatchThreads: 1,
  },
  packs: {
    small: { credits: 20 },
    medium: { credits: 60 },
    large: { credits: 150 },
  },
  costs: {
    publishHelperPost: 10,
    boostPost7Days: 15,
    extraInterest: 1,
    extraMatchThread: 3,
  },
} as const;

export type CreditPolicy = typeof CREDIT_POLICY;
