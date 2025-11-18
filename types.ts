export enum MattressLine {
  PREMIUM = 'Premium',
  DIAMOND = 'Diamond',
  PLUS = 'Plus',
  AMERICAN = 'American',
  SMART = 'Smart'
}

export interface ProductSpec {
  name: string;
  height: string;
  weightLimit: string;
  warranty: string;
  features: string[];
  badge?: string;
}

export interface QuizData {
  size: string;
  baseType: string;
  comfortProfile: string;
  needs: string;
  name: string;
  whatsapp: string;
}