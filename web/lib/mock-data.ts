export type CandidateCard = {
  id: string;
  role: "seeker" | "helper";
  headline: string;
  companyFocus: string;
  skills: string[];
  intro: string;
  anonymousName: string;
};

export const cards: CandidateCard[] = [
  {
    id: "c1",
    role: "helper",
    headline: "Backend Engineer @ Fintech",
    companyFocus: "Stripe, Revolut, Wise",
    skills: ["System design", "Referrals", "Behavioral prep"],
    intro: "I help candidates tighten stories and referral packets for EU fintech roles.",
    anonymousName: "Helper-BlueFox",
  },
  {
    id: "c2",
    role: "seeker",
    headline: "Seeking Product Analyst role",
    companyFocus: "Remote SaaS companies",
    skills: ["SQL", "A/B testing", "BI dashboards"],
    intro: "Looking for mentorship and referral path into product analytics teams.",
    anonymousName: "Seeker-Nova9",
  },
  {
    id: "c3",
    role: "helper",
    headline: "Engineering Manager @ Cloud platform",
    companyFocus: "Datadog, Elastic, HashiCorp",
    skills: ["Mock interviews", "Career strategy", "Hiring process walkthrough"],
    intro: "Can run mock interviews and share what strong referrals look like.",
    anonymousName: "Helper-Orbit",
  },
];

export const matches = [
  {
    id: "m1",
    username: "@bluefox-helper",
    revealMode: "Helper decides when to reveal identity",
    lastMessage: "Let’s prep your interview stories tomorrow.",
    updatedAt: "2h ago",
  },
  {
    id: "m2",
    username: "@seeker-nova",
    revealMode: "Username visible after match",
    lastMessage: "I can share the referral form and expectations.",
    updatedAt: "1d ago",
  },
];
