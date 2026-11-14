export interface PlaceholderCompany {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  vatNumber?: string;
  address?: string;
  category?: string;
  credits: number;
  role: "company";
  verified: boolean;
  memberSince: string;
}

export interface PlaceholderLead {
  id: string;
  category: string;
  status?: "Available" | "Sold";
  contactStatus?: "Contacted" | "In Progress" | "Completed";
  title: string;
  description: string;
  location: string;
  budget: string;
  timeline: string;
  creditsRequired: number;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface PlaceholderNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "lead" | "credit" | "system";
}

export const placeholderCompany: PlaceholderCompany = {
  id: "comp-001",
  name: "Marco",
  companyName: "Ferretti Serramenti Srl",
  email: "company@gmail.com",
  phone: "+39 333 123 4567",
  vatNumber: "IT 09876543210",
  address: "Via Roma 42, 25121 Brescia (BS)",
  category: "Windows & Doors",
  credits: 285,
  role: "company",
  verified: true,
  memberSince: "January 2024",
};

export const placeholderLeads: PlaceholderLead[] = [
  {
    id: "lead-1",
    category: "Windows & Doors",
    status: "Available",
    contactStatus: "Contacted",
    title: "Replacement of 8 PVC windows",
    description: "Family seeking quote for complete PVC window replacement, ground floor and first floor.",
    location: "Milano, Lombardia",
    budget: "€ 4,000–8,000",
    timeline: "Within 1 months",
    creditsRequired: 15,
    createdAt: "Jan 5 2026",
    customerName: "Giulia Esposito",
    customerPhone: "+39 347 220 4488",
    customerEmail: "a.ferretti@example.com",
    customerAddress: "Via dei Mille 22, 37100 Pavia, Lombardy",
    isUnlocked: true,
    unlockedAt: "Today, 10:42 AM",
  },
  {
    id: "lead-2",
    category: "Solar Panels",
    status: "Available",
    contactStatus: "In Progress",
    title: "8kW solar panel system",
    description: "Owner of semi-detached house requesting quote for solar panel system.",
    location: "Padova, Veneto",
    budget: "€ 12,000–16,000",
    timeline: "Within 2 months",
    creditsRequired: 20,
    createdAt: "Jan 3 2026",
    customerName: "Luca Bianchi",
    customerPhone: "+39 347 912 3456",
    customerEmail: "l.bianchi@gmail.com",
    customerAddress: "Via Prato della Valle 8, Padova",
    isUnlocked: true,
    unlockedAt: "Jan 3 2026",
  },
  {
    id: "lead-3",
    category: "Construction",
    status: "Available",
    contactStatus: "Completed",
    title: "Bathroom renovation",
    description: "Complete roof resurfacing with clay tiles including thermal insulation.",
    location: "Bologna, Emilia",
    budget: "€ 15,000–22,000",
    timeline: "Within 2 months",
    creditsRequired: 25,
    createdAt: "Jan 1 2026",
    customerName: "Sara Conti",
    customerPhone: "+39 339 654 3210",
    customerEmail: "sara.conti@outlook.com",
    customerAddress: "Via Saragozza 45, Bologna",
    isUnlocked: true,
    unlockedAt: "Jan 1 2026",
  },
  {
    id: "lead-4",
    category: "Moving",
    status: "Available",
    contactStatus: "Contacted",
    title: "120sqm office move",
    description: "Complete office move from EUR district to Prati, 3rd floor with elevator.",
    location: "Roma, Lazio",
    budget: "€ 1,500–3,000",
    timeline: "Jan 15 2026",
    creditsRequired: 12,
    createdAt: "Dec 29 2025",
    customerName: "Roberto Marini",
    customerPhone: "+39 338 123 9876",
    customerEmail: "r.marini@libero.it",
    customerAddress: "Via Nazionale 88, Roma",
    isUnlocked: true,
    unlockedAt: "Dec 29 2025",
  },
  {
    id: "lead-5",
    category: "Air Conditioning",
    status: "Available",
    contactStatus: "Contacted",
    title: "Installation of 3 Daikin splits",
    description: "85sqm apartment, needs 3 splits + outdoor unit for summer air conditioning.",
    location: "Campania / Napoli",
    budget: "€ 2,500–4,000",
    timeline: "Within 2 weeks",
    creditsRequired: 10,
    createdAt: "Jan 6 2026",
    customerName: "Antonio De Rosa",
    customerPhone: "+39 340 789 0123",
    customerEmail: "a.derosa@yahoo.it",
    customerAddress: "Via Toledo 120, Napoli",
    isUnlocked: false,
  },
  {
    id: "lead-6",
    category: "Solar Panels",
    status: "Available",
    contactStatus: "Contacted",
    title: "System + storage batteries",
    description: "Request for solar system with storage system to achieve energy self-sufficiency.",
    location: "Toscana / Firenze",
    budget: "€ 18,000–24,000",
    timeline: "Within 1 month",
    creditsRequired: 22,
    createdAt: "Jan 5 2026",
    customerName: "Lorenzo Ricci",
    customerPhone: "+39 334 567 8901",
    customerEmail: "l.ricci@gmail.com",
    customerAddress: "Piazza della Signoria 10, Firenze",
    isUnlocked: false,
  },
  {
    id: "lead-7",
    category: "Construction",
    status: "Sold",
    contactStatus: "Contacted",
    title: "Full bathroom renovation",
    description: "Complete bathroom overhaul with replacement of fixtures, tiles and plumbing.",
    location: "Piemonte / Torino",
    budget: "€ 6,000–9,000",
    timeline: "Immediate",
    creditsRequired: 18,
    createdAt: "Jan 5 2026",
    customerName: "Davide Martini",
    customerPhone: "+39 339 654 3210",
    customerEmail: "davide.martini@outlook.com",
    customerAddress: "Via Roma 12, Torino",
    isUnlocked: false,
  },
  {
    id: "lead-8",
    category: "Renovation",
    status: "Available",
    contactStatus: "Contacted",
    title: "Custom kitchen with installation",
    description: "Modern custom kitchen with island, quote including supply and installation.",
    location: "Lombardia / Bergamo",
    budget: "€ 8,000–14,000",
    timeline: "Within 1 month",
    creditsRequired: 15,
    createdAt: "Jan 4 2026",
    customerName: "Chiara Fontana",
    customerPhone: "+39 333 456 7891",
    customerEmail: "chiara.fontana@live.it",
    customerAddress: "Via Broseta 88, Bergamo",
    isUnlocked: false,
  },
];

export const placeholderNotifications: PlaceholderNotification[] = [
  {
    id: "notif-1",
    title: "New lead available: Windows & Doors in Milano",
    message: "A new lead in your preferred category is available.",
    time: "5 min ago",
    read: false,
    type: "lead",
  },
  {
    id: "notif-2",
    title: "Recommended lead: Solar Panels Padova",
    message: "Based on your preferences, this lead might interest you.",
    time: "1 hour ago",
    read: false,
    type: "lead",
  },
  {
    id: "notif-3",
    title: "Credits added successfully",
    message: "150 credits added to your account. Balance: 285 credits.",
    time: "2 hours ago",
    read: true,
    type: "credit",
  },
  {
    id: "notif-4",
    title: "Credit balance running low",
    message: "You have fewer than 50 credits. Consider topping up to avoid missing opportunities.",
    time: "Yesterday",
    read: true,
    type: "credit",
  },
  {
    id: "notif-5",
    title: "Lead unlocked successfully",
    message: 'You unlocked the lead "PVC window replacement" by Giulia Esposito.',
    time: "2 days ago",
    read: true,
    type: "lead",
  },
];
