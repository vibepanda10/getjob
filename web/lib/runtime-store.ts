export type SwipeAction = "INTERESTED" | "PASS";

export type SwipeRecord = {
  fromUserId: string;
  toUserId: string;
  action: SwipeAction;
  createdAt: string;
  updatedAt: string;
};

export type MatchRecord = {
  id: string;
  userAId: string;
  userBId: string;
  createdAt: string;
};

export type MessageRecord = {
  id: string;
  matchId: string;
  senderId: string;
  body: string;
  createdAt: string;
};

const swipes: SwipeRecord[] = [];
const matches: MatchRecord[] = [];
const messages: MessageRecord[] = [];

function stablePair(a: string, b: string) {
  return [a, b].sort();
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function upsertSwipe(fromUserId: string, toUserId: string, action: SwipeAction) {
  const now = new Date().toISOString();
  const existing = swipes.find((entry) => entry.fromUserId === fromUserId && entry.toUserId === toUserId);

  if (existing) {
    existing.action = action;
    existing.updatedAt = now;
  } else {
    swipes.push({ fromUserId, toUserId, action, createdAt: now, updatedAt: now });
  }

  if (action !== "INTERESTED") return { matched: false, match: null };

  const reverse = swipes.find(
    (entry) => entry.fromUserId === toUserId && entry.toUserId === fromUserId && entry.action === "INTERESTED",
  );

  if (!reverse) return { matched: false, match: null };

  const [userAId, userBId] = stablePair(fromUserId, toUserId);
  let match = matches.find((entry) => entry.userAId === userAId && entry.userBId === userBId);

  if (!match) {
    match = { id: uid("m"), userAId, userBId, createdAt: now };
    matches.push(match);
  }

  return { matched: true, match };
}

export function listMatchesForUser(userId: string) {
  return matches.filter((entry) => entry.userAId === userId || entry.userBId === userId);
}

export function createMessage(matchId: string, senderId: string, body: string) {
  const record = {
    id: uid("msg"),
    matchId,
    senderId,
    body,
    createdAt: new Date().toISOString(),
  };
  messages.push(record);
  return record;
}

export function listMessages(matchId: string) {
  return messages
    .filter((entry) => entry.matchId === matchId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function cleanupMessages(days = 60) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const before = messages.length;

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const createdAt = new Date(messages[index].createdAt).getTime();
    if (createdAt < cutoff) {
      messages.splice(index, 1);
    }
  }

  return { deleted: before - messages.length, remaining: messages.length };
}
