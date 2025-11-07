export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  user: User; 
  expiresAt: Date;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // Be cautious when transferring this (usually omitted).
  createdAt: Date;
  updatedAt: Date;
  tokens: Session[];
}

export interface Referral {
  id: string;
  dateOfReferral?: Date; // Optional field
  timeOfReferral?: string; // Optional field
  name: string;
  rnNumber?: string; // Optional field
  icNumber?: string; // Optional field
  age?: number; // Int maps to number
  sex?: Sex; // Uses the defined Sex enum, optional field
  department?: string; // Optional field
  location?: string; // Optional field
  diagnosis?: string; // Optional field
  sofaScore?: number; // Int maps to number, optional field
  categoryVentilated?: number; // Int maps to number, optional field
  reasonForReferral?: string; // Optional field
  intubatedAfterNivHfnc?: boolean; // Boolean maps to boolean, optional field
  intubationDate?: Date; // Optional field
  admittedToICU?: boolean; // Optional field
  admissionPlanned?: boolean; // Optional field
  anesthesiaRelated?: boolean; // Optional field
  notAdmittedReason?: string; // Optional field
  hospitalOutcome?: string; // Optional field
  medicalOfficerName?: string; // Optional field
  siteCoordinator?: string; // Optional field
  createdAt: Date;
  updatedAt: Date;
}