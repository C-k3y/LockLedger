export interface Milestone {
  id: string;
  title: string;
  amount: number;
  deadline: string;
  status: "pending" | "submitted" | "approved";
}

export interface Contract {
  id: string;
  client: string;
  freelancer: string;
  totalAmount: number;
  status: "escrowed" | "submitted" | "released" | "cancelled" | "disputed";
  milestones: Milestone[];
  createdAt: string;
  autoReleaseHours: number;
}

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "milestone" | "payment" | "dispute" | "general";
}

export interface Activity {
  id: string;
  action: string;
  contractId: string;
  timestamp: string;
}

export const mockContracts: Contract[] = [
  {
    id: "0x1a2b...3c4d",
    client: "0xAbC1...dEf2",
    freelancer: "0x7890...1234",
    totalAmount: 5.0,
    status: "escrowed",
    autoReleaseHours: 72,
    createdAt: "2025-04-01",
    milestones: [
      { id: "m1", title: "UI Design Mockups", amount: 1.5, deadline: "2025-04-10", status: "approved" },
      { id: "m2", title: "Frontend Development", amount: 2.0, deadline: "2025-04-20", status: "submitted" },
      { id: "m3", title: "Testing & Deployment", amount: 1.5, deadline: "2025-04-30", status: "pending" },
    ],
  },
  {
    id: "0x5e6f...7a8b",
    client: "0x7890...1234",
    freelancer: "0xCdEf...5678",
    totalAmount: 3.2,
    status: "released",
    autoReleaseHours: 48,
    createdAt: "2025-03-15",
    milestones: [
      { id: "m4", title: "Smart Contract Audit", amount: 1.6, deadline: "2025-03-25", status: "approved" },
      { id: "m5", title: "Final Report", amount: 1.6, deadline: "2025-03-30", status: "approved" },
    ],
  },
  {
    id: "0x9c0d...1e2f",
    client: "0xAbC1...dEf2",
    freelancer: "0x3456...abcd",
    totalAmount: 8.0,
    status: "submitted",
    autoReleaseHours: 72,
    createdAt: "2025-03-28",
    milestones: [
      { id: "m6", title: "Backend API", amount: 3.0, deadline: "2025-04-08", status: "approved" },
      { id: "m7", title: "Database Schema", amount: 2.5, deadline: "2025-04-15", status: "submitted" },
      { id: "m8", title: "Integration", amount: 2.5, deadline: "2025-04-22", status: "pending" },
    ],
  },
  {
    id: "0x4b5c...6d7e",
    client: "0x7890...1234",
    freelancer: "0xAbC1...dEf2",
    totalAmount: 1.8,
    status: "cancelled",
    autoReleaseHours: 24,
    createdAt: "2025-02-10",
    milestones: [
      { id: "m9", title: "Logo Design", amount: 1.8, deadline: "2025-02-20", status: "pending" },
    ],
  },
];

export const mockNotifications: Notification[] = [
  { id: "n1", message: "Milestone 'Frontend Development' submitted for review", timestamp: "2 min ago", read: false, type: "milestone" },
  { id: "n2", message: "Funds released for 'Smart Contract Audit'", timestamp: "1 hour ago", read: false, type: "payment" },
  { id: "n3", message: "New dispute raised on contract 0x9c0d...1e2f", timestamp: "3 hours ago", read: true, type: "dispute" },
  { id: "n4", message: "Milestone 'UI Design Mockups' approved", timestamp: "1 day ago", read: true, type: "milestone" },
  { id: "n5", message: "Contract 0x1a2b...3c4d created successfully", timestamp: "2 days ago", read: true, type: "general" },
];

export const mockActivities: Activity[] = [
  { id: "a1", action: "Milestone submitted: Frontend Development", contractId: "0x1a2b...3c4d", timestamp: "2 min ago" },
  { id: "a2", action: "Funds released: 3.2 ETH", contractId: "0x5e6f...7a8b", timestamp: "1 hour ago" },
  { id: "a3", action: "Milestone approved: UI Design Mockups", contractId: "0x1a2b...3c4d", timestamp: "1 day ago" },
  { id: "a4", action: "Contract created", contractId: "0x9c0d...1e2f", timestamp: "2 days ago" },
  { id: "a5", action: "Work submitted: Database Schema", contractId: "0x9c0d...1e2f", timestamp: "5 hours ago" },
];

export interface LedgerEvent {
  id: string;
  time: string;
  block: number;
  addr: string;
  action: "DEPLOY" | "FUND" | "SUBMIT" | "RELEASE" | "DISPUTE" | "APPROVE";
  amount?: string;
  contract: string;
}

export const mockLedger: LedgerEvent[] = [
  { id: "l1", time: "14:52:01", block: 19847221, addr: "0xabc...123", action: "RELEASE", amount: "0.80 ETH", contract: "0x1a2b" },
  { id: "l2", time: "14:51:55", block: 19847220, addr: "0x7A1...bC3", action: "DEPLOY", contract: "0x9c0d" },
  { id: "l3", time: "14:51:48", block: 19847219, addr: "0xdef...456", action: "FUND", amount: "5.20 ETH", contract: "0x5e6f" },
  { id: "l4", time: "14:51:30", block: 19847218, addr: "0xghi...789", action: "SUBMIT", contract: "0x1a2b" },
  { id: "l5", time: "14:51:15", block: 19847217, addr: "0x789...012", action: "APPROVE", amount: "1.10 ETH", contract: "0x5e6f" },
  { id: "l6", time: "14:51:03", block: 19847216, addr: "0xA9F...dE8", action: "DISPUTE", contract: "0x9c0d" },
  { id: "l7", time: "14:50:50", block: 19847215, addr: "0x456...789", action: "RELEASE", amount: "3.50 ETH", contract: "0x4b5c" },
  { id: "l8", time: "14:50:33", block: 19847214, addr: "0xCdEf...5678", action: "FUND", amount: "12.80 ETH", contract: "0x9c0d" },
  { id: "l9", time: "14:50:11", block: 19847213, addr: "0x3456...abcd", action: "SUBMIT", contract: "0x1a2b" },
  { id: "l10", time: "14:49:58", block: 19847212, addr: "0xAbC1...dEf2", action: "DEPLOY", contract: "0x5e6f" },
];

export const mockProfile = {
  address: "0x7890...1234",
  reputationScore: 4.8,
  completedContracts: 12,
  totalEarned: 45.6,
  badges: ["Top Freelancer", "Early Adopter", "Verified"],
  reviews: [
    { from: "0xAbC1...dEf2", rating: 5, comment: "Excellent work, delivered ahead of schedule.", date: "2025-03-30" },
    { from: "0xCdEf...5678", rating: 4, comment: "Good quality, minor revisions needed.", date: "2025-03-15" },
    { from: "0x3456...abcd", rating: 5, comment: "Very professional and communicative.", date: "2025-02-28" },
  ],
};
