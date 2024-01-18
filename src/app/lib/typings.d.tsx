export interface City {
  lat: number;
  lon: number;
}

export interface State {
  lat: number;
  lon: number;
  cities: {
    [cityName: string]: City;
  };
}

export interface CitiesData {
  [stateName: string]: State;
}

export type QueryResult = {
  item: string;
  price?: string;
  city?: City;
  market?: "offerup" | "letgo" | "facebook";
  action?: "buy" | "sell";
  link?: string;
};
