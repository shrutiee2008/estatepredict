export interface PropertyInput {
  area: number;
  location: string;
  bedrooms: number;
  propertyType: string;
  floorNo: number;
  parking: string;
  age: number;
  societyFeatures: string;
}

export interface PredictionResult {
  predictedPrice: number; // in Crores
  confidenceScore: number; // Percentage
  breakdown: {
    basePrice: number;
    areaContribution: number;
    locationPremium: number;
    typePremium: number;
    bedroomPremium: number;
    floorPremium: number;
    parkingPremium: number;
    societyPremium: number;
    ageDepreciation: number;
  };
  metrics: {
    pricePerSqft: number; // in ₹/sqft
    investmentRating: 'AAA' | 'AA' | 'A' | 'B' | 'C';
    marketDemand: 'Very High' | 'High' | 'Moderate' | 'Low';
    estimatedRent: number; // in ₹/month
  };
}

export interface HistoricalRecord {
  id: string;
  area: number;
  location: string;
  bedrooms: number;
  propertyType: string;
  price: number; // in Crores
  predictedPrice: number; // in Crores
  variance: number; // percentage variance
  date: string;
}
