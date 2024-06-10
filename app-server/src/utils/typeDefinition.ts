export interface mailContent {
  jobId?: number;
  to: string;
  subject: string;
  address?: string;
  text: string;
  html: string;
}

export interface emailJob {
  status: string;
  attempts: number;
  errorMessage?: string;
}