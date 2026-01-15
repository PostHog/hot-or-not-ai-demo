export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companySize: string;
  productInterest: string;
  industry: string;
  website: string;
}

export interface Rating {
  userId: string;
  leadId: string;
  score: number;
  ratedAt: string;
}

export interface LeadWithRating extends Lead {
  averageRating: number | null;
  totalRatings: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

export interface Session {
  userId: string;
  email: string;
  name: string;
}
