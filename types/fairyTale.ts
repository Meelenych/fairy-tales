export interface FairyTale {
  id: number;
  title: string;
  content: string;
  author?: string;
  country?: string;
  year?: number;
  clicks: number;
  hidden: boolean;
}