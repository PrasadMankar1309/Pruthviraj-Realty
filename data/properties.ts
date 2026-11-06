// ⚠️ DEMONSTRATION DATA — All listings are illustrative examples only.
// Actual property details, prices, areas and availability must be verified
// before publishing. Replace with verified listings from Pruthviraj Realty.

export type PropertyStatus = "Available" | "Sold" | "Under Negotiation" | "Coming Soon"
export type PropertyTransaction = "For Sale" | "For Rent" | "For Lease" | "New Project"
export type PropertyCategory =
  | "Farmhouse Plot"
  | "Residential Plot"
  | "Commercial Plot"
  | "Flat / Apartment"
  | "Row House / Villa"
  | "Commercial Property"
  | "Agricultural Land"
  | "NA Land"
  | "Industrial Property"
  | "Large Land Parcel"
  | "New Project"
  | "Investment Opportunity"
  | "House"
  | "Condo"

export interface Property {
  id: string
  title: string
  location: string
  city: string
  area: string             // human-readable area string e.g. "2000 sq ft"
  areaSqFt?: number        // numeric for filtering
  price: number            // in INR; 0 if price-on-request
  priceOnRequest?: boolean
  priceDisplay?: string    // e.g. "₹45 Lakh" or "Price on request"
  image: string
  images?: string[]
  beds?: number
  baths?: number
  category: PropertyCategory
  transaction: PropertyTransaction
  status: PropertyStatus
  description: string
  features?: string[]
  amenities?: string[]
  roadAccess?: string
  possession?: string
  developer?: string
  isDemo: true             // Always true — must be set for demo data
  isFeatured?: boolean
  isNew?: boolean
  projectId?: string
}

export const properties: Property[] = [
  // ──────────── FARMHOUSE PLOTS ────────────
  {
    id: "fp-001",
    title: "Scenic Farmhouse Plot near Gangapur Dam",
    location: "Gangapur Road, Nashik",
    city: "Nashik",
    area: "5 Gunthas",
    areaSqFt: 5445,
    price: 0,
    priceOnRequest: true,
    priceDisplay: "Price on Request",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1332&auto=format&fit=crop",
    category: "Farmhouse Plot",
    transaction: "For Sale",
    status: "Available",
    description: "A beautiful open plot on the outskirts of Nashik, ideal for a weekend home or farmhouse. Scenic surroundings with natural views and easy highway access.",
    features: ["Clear title", "Near dam", "Highway access", "Scenic views"],
    roadAccess: "40-ft access road",
    isDemo: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "fp-002",
    title: "Weekend Home Plot – Trimbakeshwar Road",
    location: "Trimbakeshwar, Nashik",
    city: "Nashik",
    area: "10 Gunthas",
    areaSqFt: 10890,
    price: 4500000,
    priceDisplay: "₹45 Lakh",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170&auto=format&fit=crop",
    category: "Farmhouse Plot",
    transaction: "For Sale",
    status: "Available",
    description: "Flat open plot with excellent road connectivity to Trimbakeshwar temple town. Ideal for building a weekend retreat or farmhouse. Close to vineyards and nature.",
    features: ["Flat land", "Electricity nearby", "Water source available", "Peaceful location"],
    roadAccess: "Metalled road",
    isDemo: true,
    isFeatured: false,
  },

  // ──────────── RESIDENTIAL PLOTS ────────────
  {
    id: "rp-001",
    title: "Residential Plot in Gangapur Road Layout",
    location: "Gangapur Road, Nashik",
    city: "Nashik",
    area: "1,800 sq ft",
    areaSqFt: 1800,
    price: 5400000,
    priceDisplay: "₹54 Lakh",
    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=1170&auto=format&fit=crop",
    category: "Residential Plot",
    transaction: "For Sale",
    status: "Available",
    description: "NA-approved residential plot in a developing layout on Gangapur Road. All basic amenities in place. Ideal for individual bungalow construction.",
    features: ["NA approved", "Layout plot", "Drainage", "Street lights"],
    roadAccess: "24-ft internal road",
    possession: "Immediate",
    isDemo: true,
    isFeatured: true,
  },
  {
    id: "rp-002",
    title: "Corner Plot – Sinnar Highway Belt",
    location: "Sinnar, Nashik",
    city: "Nashik",
    area: "2,400 sq ft",
    areaSqFt: 2400,
    price: 3200000,
    priceDisplay: "₹32 Lakh",
    image: "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?q=80&w=1170&auto=format&fit=crop",
    category: "Residential Plot",
    transaction: "For Sale",
    status: "Available",
    description: "Prime corner plot with two-road frontage, located in the rapidly developing Sinnar belt near the Mumbai-Agra highway. Excellent investment opportunity.",
    features: ["Corner plot", "Two road access", "Developing zone", "Clear title"],
    roadAccess: "Two-road frontage",
    isDemo: true,
  },

  // ──────────── COMMERCIAL PLOTS ────────────
  {
    id: "cp-001",
    title: "Commercial Plot on Mumbai-Agra Highway",
    location: "Sinnar, Nashik",
    city: "Nashik",
    area: "5,000 sq ft",
    areaSqFt: 5000,
    price: 0,
    priceOnRequest: true,
    priceDisplay: "Price on Request",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1170&auto=format&fit=crop",
    category: "Commercial Plot",
    transaction: "For Sale",
    status: "Available",
    description: "High-visibility commercial plot on the Mumbai-Agra National Highway. Ideal for showrooms, retail outlets, hotels or commercial complexes.",
    features: ["Highway frontage", "High visibility", "Ample area", "Commercial zone"],
    roadAccess: "National Highway frontage",
    isDemo: true,
    isFeatured: true,
  },

  // ──────────── FLATS & APARTMENTS ────────────
  {
    id: "fa-001",
    title: "2 BHK Premium Apartment – Gangapur Road",
    location: "Gangapur Road, Nashik",
    city: "Nashik",
    area: "1,050 sq ft",
    areaSqFt: 1050,
    price: 5500000,
    priceDisplay: "₹55 Lakh",
    image: "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=1428&auto=format&fit=crop",
    beds: 2,
    baths: 2,
    category: "Flat / Apartment",
    transaction: "For Sale",
    status: "Available",
    description: "Well-designed 2 BHK apartment in a gated society on Gangapur Road. Premium finishes, car parking, modular kitchen. Ready to move.",
    features: ["Car parking", "Modular kitchen", "Vitrified flooring", "Power backup"],
    amenities: ["Swimming pool", "Gymnasium", "Children's play area", "24-hr security"],
    possession: "Ready to move",
    isDemo: true,
    isFeatured: true,
  },
  {
    id: "fa-002",
    title: "3 BHK Luxury Flat – City Centre",
    location: "Nashik City",
    city: "Nashik",
    area: "1,600 sq ft",
    areaSqFt: 1600,
    price: 9500000,
    priceDisplay: "₹95 Lakh",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1170&auto=format&fit=crop",
    beds: 3,
    baths: 3,
    category: "Flat / Apartment",
    transaction: "For Sale",
    status: "Available",
    description: "Spacious 3 BHK in a premium high-rise. City views, top-quality finishes, two car parks, and full amenities. Ideal for families and discerning buyers.",
    features: ["Two car parks", "City view", "Premium finishes", "VRV AC"],
    amenities: ["Rooftop lounge", "Gym", "Club house", "24-hr security", "Visitor parking"],
    possession: "Ready to move",
    isDemo: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "fa-003",
    title: "1 BHK Apartment for Rent – Dindori Road",
    location: "Dindori Road, Nashik",
    city: "Nashik",
    area: "650 sq ft",
    areaSqFt: 650,
    price: 12000,
    priceDisplay: "₹12,000/month",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    beds: 1,
    baths: 1,
    category: "Flat / Apartment",
    transaction: "For Rent",
    status: "Available",
    description: "Cozy 1 BHK apartment available for rent in a quiet residential area. Well-maintained, semi-furnished, close to schools and markets.",
    features: ["Semi-furnished", "Car parking", "24-hr water"],
    possession: "Immediate",
    isDemo: true,
  },

  // ──────────── ROW HOUSES & VILLAS ────────────
  {
    id: "rh-001",
    title: "Premium Row House – Gangapur Road Township",
    location: "Gangapur Road, Nashik",
    city: "Nashik",
    area: "2,200 sq ft",
    areaSqFt: 2200,
    price: 12500000,
    priceDisplay: "₹1.25 Crore",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
    beds: 3,
    baths: 3,
    category: "Row House / Villa",
    transaction: "For Sale",
    status: "Available",
    description: "Elegant row house in a gated township with all modern amenities. Private garden, two-car garage, premium interiors. Suitable for families seeking a bungalow lifestyle.",
    features: ["Private garden", "Two-car garage", "Premium interiors", "Vastu compliant"],
    amenities: ["Clubhouse", "Swimming pool", "Security", "Landscaped grounds"],
    possession: "Ready to move",
    developer: "Reputed Nashik developer (demo)",
    isDemo: true,
    isFeatured: true,
  },

  // ──────────── COMMERCIAL PROPERTIES ────────────
  {
    id: "comm-001",
    title: "Commercial Office Space – Nashik Road",
    location: "Nashik Road, Nashik",
    city: "Nashik",
    area: "1,200 sq ft",
    areaSqFt: 1200,
    price: 7500000,
    priceDisplay: "₹75 Lakh",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    category: "Commercial Property",
    transaction: "For Sale",
    status: "Available",
    description: "Ready office space in a commercial complex on Nashik Road. Ideal for offices, clinics or professional setups. Lift access, parking, 24-hr electricity.",
    features: ["Lift access", "Dedicated parking", "Power backup", "24-hr security"],
    possession: "Ready to move",
    isDemo: true,
  },
  {
    id: "comm-002",
    title: "Shop for Rent – Gangapur Road Commercial Complex",
    location: "Gangapur Road, Nashik",
    city: "Nashik",
    area: "400 sq ft",
    areaSqFt: 400,
    price: 20000,
    priceDisplay: "₹20,000/month",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    category: "Commercial Property",
    transaction: "For Rent",
    status: "Available",
    description: "Ground-floor shop unit in an established commercial complex. High footfall area, suitable for retail, food & beverage or services.",
    features: ["Ground floor", "High footfall", "Street frontage", "Power connection"],
    isDemo: true,
  },

  // ──────────── AGRICULTURAL & NA LAND ────────────
  {
    id: "agr-001",
    title: "Agricultural Land – Niphad Taluka",
    location: "Niphad, Nashik",
    city: "Nashik",
    area: "5 Acres",
    areaSqFt: 217800,
    price: 0,
    priceOnRequest: true,
    priceDisplay: "Price on Request",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1332&auto=format&fit=crop",
    category: "Agricultural Land",
    transaction: "For Sale",
    status: "Available",
    description: "5 acres of agricultural land near the Godavari river belt in Niphad. Fertile soil, canal irrigation access, clear 7/12 records. Suitable for grapes, pomegranate or mixed farming.",
    features: ["Canal irrigation", "River proximity", "Fertile soil", "Clear 7/12"],
    roadAccess: "Village road access",
    isDemo: true,
    isFeatured: false,
  },
  {
    id: "na-001",
    title: "NA Plot – Trimbakeshwar Growth Zone",
    location: "Trimbakeshwar, Nashik",
    city: "Nashik",
    area: "3,000 sq ft",
    areaSqFt: 3000,
    price: 2700000,
    priceDisplay: "₹27 Lakh",
    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=1200&auto=format&fit=crop",
    category: "NA Land",
    transaction: "For Sale",
    status: "Available",
    description: "Non-agricultural approved plot in the Trimbakeshwar area. Permission obtained. Suitable for bungalow, commercial or hospitality development.",
    features: ["NA approved", "Development permission", "Metalled road access", "Electricity nearby"],
    isDemo: true,
  },

  // ──────────── INDUSTRIAL PROPERTIES ────────────
  {
    id: "ind-001",
    title: "Industrial Gala – Sinnar MIDC",
    location: "Sinnar MIDC, Nashik",
    city: "Nashik",
    area: "2,500 sq ft",
    areaSqFt: 2500,
    price: 0,
    priceOnRequest: true,
    priceDisplay: "Price on Request",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1231&auto=format&fit=crop",
    category: "Industrial Property",
    transaction: "For Sale",
    status: "Available",
    description: "Industrial gala unit in Sinnar MIDC. High-power load sanctioned, loading dock, suitable for light manufacturing, warehousing or processing units.",
    features: ["Three-phase power", "Loading dock", "Water connection", "MIDC road"],
    roadAccess: "MIDC internal road",
    isDemo: true,
    isFeatured: true,
  },

  // ──────────── LARGE LAND PARCELS ────────────
  {
    id: "llp-001",
    title: "Large Development Land Parcel – Nashik Outskirts",
    location: "Dindori Road, Nashik",
    city: "Nashik",
    area: "15 Acres",
    areaSqFt: 653400,
    price: 0,
    priceOnRequest: true,
    priceDisplay: "Price on Request",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1169&auto=format&fit=crop",
    category: "Large Land Parcel",
    transaction: "For Sale",
    status: "Available",
    description: "Large contiguous land parcel on Dindori Road ideal for a township, plotted development or commercial project. Strategic growth corridor with good road frontage.",
    features: ["Contiguous land", "Road frontage", "Developing belt", "Title clear"],
    roadAccess: "State highway frontage",
    isDemo: true,
    isFeatured: true,
  },
]

// Helper functions
export function getFeaturedProperties(): Property[] {
  return properties.filter(p => p.isFeatured && p.status === "Available")
}

export function getPropertiesByCategory(category: PropertyCategory): Property[] {
  return properties.filter(p => p.category === category)
}

export function getPropertiesByTransaction(transaction: PropertyTransaction): Property[] {
  return properties.filter(p => p.transaction === transaction)
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id)
}

export function getRelatedProperties(property: Property, limit = 3): Property[] {
  return properties
    .filter(p => p.id !== property.id && p.category === property.category)
    .slice(0, limit)
}

export function searchProperties(params: {
  location?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  transaction?: string
  minArea?: number
  maxArea?: number
}): Property[] {
  return properties.filter(p => {
    if (params.location && !p.location.toLowerCase().includes(params.location.toLowerCase()) &&
        !p.city.toLowerCase().includes(params.location.toLowerCase())) return false
    if (params.category && params.category !== "all" && p.category !== params.category) return false
    if (params.transaction && params.transaction !== "all" && p.transaction !== params.transaction) return false
    if (params.minPrice && !p.priceOnRequest && p.price < params.minPrice) return false
    if (params.maxPrice && !p.priceOnRequest && p.price > params.maxPrice) return false
    if (params.minArea && p.areaSqFt && p.areaSqFt < params.minArea) return false
    if (params.maxArea && p.areaSqFt && p.areaSqFt > params.maxArea) return false
    return true
  })
}

// Category metadata for display
export const propertyCategories = [
  {
    id: "farmhouse-plots",
    label: "Farmhouse Plots",
    category: "Farmhouse Plot" as PropertyCategory,
    description: "Weekend retreats and scenic farmhouse land",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    route: "/properties/farmhouse-plots",
  },
  {
    id: "residential-plots",
    label: "Residential Plots",
    category: "Residential Plot" as PropertyCategory,
    description: "NA approved plots for individual construction",
    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=800&auto=format&fit=crop",
    route: "/properties/residential-plots",
  },
  {
    id: "commercial-plots",
    label: "Commercial Plots",
    category: "Commercial Plot" as PropertyCategory,
    description: "Strategic commercial land on key corridors",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop",
    route: "/properties/commercial-plots",
  },
  {
    id: "flats-apartments",
    label: "Flats & Apartments",
    category: "Flat / Apartment" as PropertyCategory,
    description: "Modern apartments and premium residences",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    route: "/properties/flats-apartments",
  },
  {
    id: "row-houses-villas",
    label: "Row Houses & Villas",
    category: "Row House / Villa" as PropertyCategory,
    description: "Elegant row houses and independent villas",
    image: "https://images.unsplash.com/photo-1600047508788-786f3865b4b9?q=80&w=800&auto=format&fit=crop",
    route: "/properties/row-houses-villas",
  },
  {
    id: "commercial-properties",
    label: "Commercial Properties",
    category: "Commercial Property" as PropertyCategory,
    description: "Shops, offices and commercial complexes",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    route: "/properties/commercial-properties",
  },
  {
    id: "agricultural-land",
    label: "Agricultural & NA Land",
    category: "Agricultural Land" as PropertyCategory,
    description: "Farmland, NA plots and development land",
    // Different image — green agricultural fields (distinct from farmhouse)
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
    route: "/properties/agricultural-land",
  },
  {
    id: "industrial-properties",
    label: "Industrial Properties",
    category: "Industrial Property" as PropertyCategory,
    description: "MIDC galas, warehouses and industrial units",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop",
    route: "/properties/industrial-properties",
  },
  {
    id: "large-land-parcels",
    label: "Large Land Parcels",
    category: "Large Land Parcel" as PropertyCategory,
    description: "Large plots for township or project development",
    // Aerial land / development site image (distinct from commercial office)
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop",
    route: "/properties/large-land",
  },
]

// Nashik target locations for the location picker
export const nashikLocations = [
  "All Locations",
  "Nashik City",
  "Gangapur Road",
  "Trimbakeshwar",
  "Sinnar",
  "Dindori Road",
  "Niphad",
  "Nashik Road",
  "Ambad",
  "Satpur",
  "Cidco",
  "Panchavati",
]
