export interface Request {
  id: number;
  requestorName: string;
  itemDescription: string;
  priceProduct: string;
  status?: string;
  observations?: string;
}
