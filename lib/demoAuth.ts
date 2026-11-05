"use client";

export interface DemoCompanyUser {
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

export interface DemoLead {
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

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "lead" | "credit" | "system";
}

export interface CreditTransaction {
  id: string;
  type: "purchase" | "spend";
  amount: number;
  description: string;
  date: string;
  balanceAfter: number;
}

const DEFAULT_DEMO_USER: DemoCompanyUser = {
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

const INITIAL_DEMO_LEADS: DemoLead[] = [
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

const INITIAL_NOTIFICATIONS: DemoNotification[] = [
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

const INITIAL_TRANSACTIONS: CreditTransaction[] = [
  {
    id: "tx-1",
    type: "purchase",
    amount: 145,
    description: "Welcome credit package",
    date: "Jan 15, 2024",
    balanceAfter: 145,
  },
  {
    id: "tx-2",
    type: "spend",
    amount: 10,
    description: "Unlocked Lead #104 (Elena Bianchi - Turin)",
    date: "Jan 18, 2024",
    balanceAfter: 135,
  },
  {
    id: "tx-3",
    type: "spend",
    amount: 15,
    description: "Unlocked Lead #101 (Giulia Romano - Brescia)",
    date: "Today, 10:15 AM",
    balanceAfter: 120,
  },
];

// Local Storage Keys
const STORAGE_KEYS = {
  USER: "demo_company_user",
  LEADS: "demo_company_leads",
  NOTIFS: "demo_company_notifs",
  TRANSACTIONS: "demo_company_txs",
  REGISTERED_ACCOUNTS: "demo_registered_accounts",
};

/**
 * Retrieves the current logged-in demo company session.
 */
export function getCompanySession(): DemoCompanyUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoCompanyUser;
    if (parsed.email === "company@gmail.com" && (parsed.credits === 120 || !parsed.name || parsed.name === "Marco Ferretti")) {
      parsed.credits = 285;
      parsed.name = "Marco";
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Sets the company session and syncs the cookie for persistence across reloads.
 */
export function setCompanySession(user: DemoCompanyUser): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    document.cookie = `company_logged_in=true; path=/; max-age=2592000; SameSite=Lax`;
  } catch {
    // ignore
  }
}

/**
 * Clears the session on logout.
 */
export function clearCompanySession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    document.cookie = "company_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  } catch {
    // ignore
  }
}

/**
 * Validates login credentials against default demo credentials or locally registered accounts.
 */
export function loginDemo(emailInput: string, passwordInput: string): { success: boolean; user?: DemoCompanyUser; error?: string } {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput.trim();

  // 1. Check default credentials: company@gmail.com / hello123
  if (email === "company@gmail.com" && password === "hello123") {
    const existing = getCompanySession();
    const userToSet = existing || DEFAULT_DEMO_USER;
    setCompanySession(userToSet);
    return { success: true, user: userToSet };
  }

  // 2. Check registered accounts from /register
  try {
    const registeredRaw = localStorage.getItem(STORAGE_KEYS.REGISTERED_ACCOUNTS);
    if (registeredRaw) {
      const accounts = JSON.parse(registeredRaw);
      const match = accounts.find((acc: { email: string; password?: string }) => acc.email.toLowerCase() === email);
      if (match) {
        if (!match.password || match.password === password) {
          const user: DemoCompanyUser = {
            id: match.id || `comp-${Date.now()}`,
            name: `${match.firstName || "Company"} ${match.lastName || "Owner"}`,
            companyName: match.company || "Verified Company",
            email: match.email,
            phone: match.phone || "+39 333 000 0000",
            vatNumber: match.vat || "IT 12345678901",
            address: match.address || "Via Milano 10, Italy",
            category: "General Services",
            credits: match.credits ?? 120,
            role: "company",
            verified: true,
            memberSince: "Recent",
          };
          setCompanySession(user);
          return { success: true, user };
        } else {
          return { success: false, error: "Incorrect password for this registered account." };
        }
      }
    }
  } catch {
    // ignore
  }

  return {
    success: false,
    error: "Invalid credentials. Use demo: company@gmail.com / hello123",
  };
}

/**
 * Saves a newly registered company into local demo storage.
 */
export function registerDemoCompany(formData: {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  password?: string;
}): DemoCompanyUser {
  const email = formData.email.trim().toLowerCase();
  const newAccount = {
    id: `comp-${Date.now()}`,
    firstName: formData.firstName,
    lastName: formData.lastName,
    company: formData.company,
    email: email,
    phone: formData.phone,
    password: formData.password,
    credits: 120,
    createdAt: new Date().toISOString(),
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_ACCOUNTS);
    const existing = raw ? JSON.parse(raw) : [];
    const filtered = existing.filter((acc: { email: string }) => acc.email.toLowerCase() !== email);
    filtered.push(newAccount);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_ACCOUNTS, JSON.stringify(filtered));
  } catch {
    // ignore
  }

  const user: DemoCompanyUser = {
    id: newAccount.id,
    name: `${formData.firstName} ${formData.lastName}`,
    companyName: formData.company,
    email: email,
    phone: formData.phone,
    vatNumber: "IT 12345678901",
    address: "Registered Italian Address",
    category: "Professional Contractor",
    credits: 120,
    role: "company",
    verified: true,
    memberSince: "Just now",
  };

  return user;
}

/**
 * Returns the list of demo leads.
 */
export function getDemoLeads(): DemoLead[] {
  if (typeof window === "undefined") return INITIAL_DEMO_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (!raw || raw.includes("lead-101") || !raw.includes("contactStatus")) {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_LEADS;
  }
}

/**
 * Unlocks a lead, spends credits, records a transaction and a notification.
 */
export function unlockDemoLead(leadId: string): { success: boolean; lead?: DemoLead; error?: string; remainingCredits?: number } {
  const user = getCompanySession();
  if (!user) {
    return { success: false, error: "Please log in to unlock leads." };
  }

  const leads = getDemoLeads();
  const leadIndex = leads.findIndex((l) => l.id === leadId);
  if (leadIndex === -1) {
    return { success: false, error: "Lead not found." };
  }

  const lead = leads[leadIndex];
  if (lead.isUnlocked) {
    return { success: true, lead, remainingCredits: user.credits };
  }

  if (user.credits < lead.creditsRequired) {
    return {
      success: false,
      error: `Insufficient credits. You need ${lead.creditsRequired} credits, but you currently have ${user.credits} credits.`,
    };
  }

  // Deduct credits
  user.credits -= lead.creditsRequired;
  setCompanySession(user);

  // Mark lead unlocked
  lead.isUnlocked = true;
  lead.unlockedAt = "Just now";
  if (!lead.contactStatus) {
    lead.contactStatus = "Contacted";
  }
  leads[leadIndex] = lead;
  try {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  } catch {
    // ignore
  }

  // Add transaction
  recordTransaction({
    id: `tx-${Date.now()}`,
    type: "spend",
    amount: lead.creditsRequired,
    description: `Unlocked: ${lead.title} (${lead.customerName})`,
    date: "Just now",
    balanceAfter: user.credits,
  });

  // Add notification
  addNotification({
    id: `notif-${Date.now()}`,
    title: "Lead Unlocked!",
    message: `Contact details for ${lead.customerName} are now visible.`,
    time: "Just now",
    read: false,
    type: "lead",
  });

  return { success: true, lead, remainingCredits: user.credits };
}

/**
 * Updates the contact status of an unlocked lead (e.g. Contacted, In Progress, Completed).
 */
export function updateLeadContactStatus(
  leadId: string,
  newStatus: "Contacted" | "In Progress" | "Completed"
): boolean {
  if (typeof window === "undefined") return false;
  try {
    const leads = getDemoLeads();
    const idx = leads.findIndex((l) => l.id === leadId);
    if (idx !== -1) {
      leads[idx].contactStatus = newStatus;
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Buys demo credits and updates balance.
 */
export function buyDemoCredits(amount: number, packageName: string): { success: boolean; newBalance: number } {
  const user = getCompanySession() || DEFAULT_DEMO_USER;
  user.credits += amount;
  setCompanySession(user);

  recordTransaction({
    id: `tx-${Date.now()}`,
    type: "purchase",
    amount,
    description: `Purchased ${packageName} (+${amount} credits)`,
    date: "Just now",
    balanceAfter: user.credits,
  });

  addNotification({
    id: `notif-${Date.now()}`,
    title: "Credits Added",
    message: `${amount} credits have been added to your balance. Total: ${user.credits}`,
    time: "Just now",
    read: false,
    type: "credit",
  });

  return { success: true, newBalance: user.credits };
}

/**
 * Returns the transactions list.
 */
export function getDemoTransactions(): CreditTransaction[] {
  if (typeof window === "undefined") return INITIAL_TRANSACTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TRANSACTIONS;
  }
}

function recordTransaction(tx: CreditTransaction): void {
  try {
    const txs = getDemoTransactions();
    txs.unshift(tx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(txs));
  } catch {
    // ignore
  }
}

/**
 * Returns notifications list.
 */
export function getDemoNotifications(): DemoNotification[] {
  if (typeof window === "undefined") return INITIAL_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    if (!raw || raw.includes("Brescia")) {
      localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
}

function addNotification(notif: DemoNotification): void {
  try {
    const notifs = getDemoNotifications();
    notifs.unshift(notif);
    localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifs));
  } catch {
    // ignore
  }
}

/**
 * Updates profile details.
 */
export function updateCompanyProfile(updates: Partial<DemoCompanyUser>): DemoCompanyUser {
  const current = getCompanySession() || DEFAULT_DEMO_USER;
  const updated: DemoCompanyUser = {
    ...current,
    ...updates,
  };
  setCompanySession(updated);
  return updated;
}

