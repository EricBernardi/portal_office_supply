export interface Request {
  id: number;
  requesterName: string;
  description: string;
  price: string;
  status?: string;
  observations?: string;
}
