export type FundCategory = 'FPV' | 'FIC';
export type NotificationMethod = 'email' | 'sms';
export type TransactionType = 'SUBSCRIPTION' | 'CANCELLATION';

export interface Fund {
  id: number;
  name: string;
  minimumAmount: number;
  category: FundCategory;
}

export interface Position {
  id: number;
  fundId: number;
  amount: number;
  subscribedAt: string;
}

export interface Transaction {
  id?: number;
  type: TransactionType;
  fundId: number;
  fundName: string;
  amount: number;
  createdAt: string;
  notificationMethod?: NotificationMethod;
}

export interface UserBalance {
  id: number;
  amount: number;
}
