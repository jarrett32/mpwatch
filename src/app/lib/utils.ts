import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import citiesData from "../../../public/cities.json";
import type { City } from "./typings.d";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAllCities(): City[] {
  return citiesData.cities;
}

export function getCityFromLL(lat: number, lon: number): string | null {
  let closestCity: string | null = null;
  let minDist = Infinity;

  citiesData.cities.forEach((city) => {
    const dist = haversineDistance(lat, lon, city.lat, city.lon);
    if (dist < minDist) {
      minDist = dist;
      closestCity = city.name;
    }
  });

  return closestCity;
}

// Haversine Distance formula to calculate distance between two lat/lon points
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
