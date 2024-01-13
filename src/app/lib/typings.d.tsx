export type City = {
  name: string;
  country?: string;
  state?: string;
  lat: number;
  lng: number;
};

export type QueryResult = {
  item: string;
  price?: string;
  City?: City;
  market?: "offerup" | "letgo" | "facebook";
  action?: "buy" | "sell";
  link?: string;
};
