export interface City {
  name: string;
  state: string;
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
  location?: string;
  market?: "offerup" | "letgo" | "facebook";
  link?: string;
};
