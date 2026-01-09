export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isError?: boolean;
}

export enum BotStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  STREAMING = 'STREAMING',
  ERROR = 'ERROR'
}