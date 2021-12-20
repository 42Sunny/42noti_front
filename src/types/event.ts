export type Event = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  currentSubscribers: number | null;
  maxSubscribers: number | null;
  tags: Array<string>;
  endAt: string;
  beginAt: string;
  createdAt: string;
  updatedAt: string;
};
