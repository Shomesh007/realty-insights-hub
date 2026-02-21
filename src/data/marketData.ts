// Appreciation rates by location (annual %)
export const appreciationRates: Record<string, number> = {
    "downtown-dubai": 8.5,
    "dubai-marina": 7.2,
    "palm-jumeirah": 9.1,
    "business-bay": 7.8,
    "dubai-hills": 10.2,
    "jumeirah-village": 6.5,
    "dubai-creek": 8.0,
    "al-barsha": 5.8,
    "arabian-ranches": 6.9,
    "dubai-south": 11.5,
};

// Rental yields by location and bedroom count (annual %)
export const rentalYields: Record<string, Record<string, number>> = {
    "downtown-dubai": {
        studio: 7.2,
        "1-bedroom": 6.8,
        "2-bedrooms": 6.2,
        "3-bedrooms": 5.5,
    },
    "dubai-marina": {
        studio: 8.1,
        "1-bedroom": 7.4,
        "2-bedrooms": 6.7,
        "3-bedrooms": 5.9,
    },
    "palm-jumeirah": {
        studio: 5.5,
        "1-bedroom": 5.8,
        "2-bedrooms": 5.3,
        "3-bedrooms": 4.8,
    },
    "business-bay": {
        studio: 8.4,
        "1-bedroom": 7.9,
        "2-bedrooms": 7.1,
        "3-bedrooms": 6.3,
    },
    "dubai-hills": {
        studio: 6.0,
        "1-bedroom": 5.8,
        "2-bedrooms": 5.5,
        "3-bedrooms": 5.0,
    },
    "jumeirah-village": {
        studio: 9.2,
        "1-bedroom": 8.5,
        "2-bedrooms": 7.8,
        "3-bedrooms": 7.0,
    },
    "dubai-creek": {
        studio: 6.8,
        "1-bedroom": 6.5,
        "2-bedrooms": 6.0,
        "3-bedrooms": 5.4,
    },
    "al-barsha": {
        studio: 7.5,
        "1-bedroom": 7.0,
        "2-bedrooms": 6.5,
        "3-bedrooms": 5.8,
    },
    "arabian-ranches": {
        studio: 5.0,
        "1-bedroom": 5.2,
        "2-bedrooms": 5.0,
        "3-bedrooms": 4.5,
    },
    "dubai-south": {
        studio: 8.8,
        "1-bedroom": 8.2,
        "2-bedrooms": 7.5,
        "3-bedrooms": 6.8,
    },
};

// Property types
export const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "townhouse", label: "Townhouse" },
    { value: "penthouse", label: "Penthouse" },
];

// Locations
export const locations = [
    { value: "downtown-dubai", label: "Downtown Dubai" },
    { value: "dubai-marina", label: "Dubai Marina" },
    { value: "palm-jumeirah", label: "Palm Jumeirah" },
    { value: "business-bay", label: "Business Bay" },
    { value: "dubai-hills", label: "Dubai Hills" },
    { value: "jumeirah-village", label: "Jumeirah Village Circle" },
    { value: "dubai-creek", label: "Dubai Creek Harbour" },
    { value: "al-barsha", label: "Al Barsha" },
    { value: "arabian-ranches", label: "Arabian Ranches" },
    { value: "dubai-south", label: "Dubai South" },
];

// Bedroom options
export const bedroomOptions = [
    { value: "studio", label: "Studio" },
    { value: "1-bedroom", label: "1 Bedroom" },
    { value: "2-bedrooms", label: "2 Bedrooms" },
    { value: "3-bedrooms", label: "3+ Bedrooms" },
];

// Currency conversion rates
export const currencyRates: Record<string, number> = {
    AED: 1,
    USD: 0.2723,
    INR: 22.41,
};

// Millionaire threshold in AED
export const MILLIONAIRE_THRESHOLD_AED = 3670000;

// Visa eligibility minimum investment (AED)
export const VISA_ELIGIBILITY_MIN = 750000;
