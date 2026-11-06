// ⚠️ DEMONSTRATION DATA — All projects are illustrative demonstration entries for Pruthviraj Realty.
export interface Project {
  id: string
  title: string
  developer: string
  location: string
  city: string
  type: "Plotted Development" | "Luxury Residences" | "Commercial Hub" | "Township"
  status: "Under Construction" | "Ready for Possession" | "Launching Soon"
  configurations: string[]
  priceStarting: string
  reraId: string
  coverImage: string
  galleryImages: string[]
  description: string
  highlights: string[]
  amenities: string[]
  connectivity: string[]
  possessionDate: string
  brochureUrl?: string
  isFeatured?: boolean
}

export const projects: Project[] = [
  {
    id: "proj-gangapur-greens",
    title: "Gangapur Greens Plotted Haven",
    developer: "Pruthviraj Realty & Associates",
    location: "Gangapur Road Extension, Nashik",
    city: "Nashik",
    type: "Plotted Development",
    status: "Ready for Possession",
    configurations: ["1,500 sq ft plots", "2,400 sq ft plots", "5 Guntha Farmhouse Plots"],
    priceStarting: "₹42 Lakh onwards",
    reraId: "P51600099001 (Demo)",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1332&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1332&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "A secure, master-planned gated enclave of clear-title sanctioned NA residential and weekend farmhouse plots overlooking scenic vineyards and the backwaters of Gangapur Dam.",
    highlights: [
      "Town Planning sanctioned NA layout",
      "Underground cabling & drainage networks",
      "60-ft wide concrete internal arterial roads",
      "Individual demarcation with compound walling",
    ],
    amenities: ["Grand Entrance Arch", "24x7 Security & CCTV", "Clubhouse & Landscape Garden", "Walking Trails", "Children Play Area"],
    connectivity: ["12 mins from College Road", "15 mins to Trimbak Road", "25 mins to Nashik City Center"],
    possessionDate: "Immediate",
    isFeatured: true,
  },
  {
    id: "proj-serene-vistas",
    title: "Serene Vistas Luxury Residences",
    developer: "Aura Developers & Pruthviraj Realty Marketing",
    location: "Mahatmanagar, Gangapur Road, Nashik",
    city: "Nashik",
    type: "Luxury Residences",
    status: "Under Construction",
    configurations: ["3 BHK Luxury", "4 BHK Sky Duplex"],
    priceStarting: "₹1.45 Crore onwards",
    reraId: "P51600099002 (Demo)",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "An iconic low-density architectural address blending timeless stone finishes, double-height sundecks, and panoramic views of the city's green canopy.",
    highlights: [
      "Only 2 residences per floor with private elevator lobby",
      "10.5 ft floor-to-ceiling clear height",
      "German modular fittings & Italian marble flooring",
      "EV charging provision for all parking bays",
    ],
    amenities: ["Rooftop Infinity Edge Pool", "Fitness & Yoga Pavilion", "Banquet Lounge", "EV Charging Station", "Intercom & Video Door Phone"],
    connectivity: ["2 mins from Gangapur Road", "8 mins to Nashik Road Station corridor", "Near premier schools and hospitals"],
    possessionDate: "December 2026",
    isFeatured: true,
  },
  {
    id: "proj-nashik-business-hub",
    title: "The Capital Commercial Square",
    developer: "Imperial Infra Partners",
    location: "Mumbai Naka, Central Nashik",
    city: "Nashik",
    type: "Commercial Hub",
    status: "Launching Soon",
    configurations: ["Grade-A Offices (450 – 3,500 sq ft)", "Retail Showrooms"],
    priceStarting: "₹65 Lakh onwards",
    reraId: "P51600099003 (Demo)",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Centrally positioned commercial landmark built for corporates, medical consultants, legal firms, and premium retail brands with triple-height entrance atrium.",
    highlights: [
      "High-speed passenger & service elevators",
      "100% DG power backup for essential & common services",
      "Multi-level mechanical automated basement parking",
      "IGBC certified Green Building design",
    ],
    amenities: ["Grand Double Height Lobby", "Conference & Board Rooms", "Cafeteria & Terrace Lounge", "Valet Parking"],
    connectivity: ["Highway touch location", "5 mins from CBS Nashik", "Direct connectivity to Mumbai-Agra Highway"],
    possessionDate: "March 2027",
    isFeatured: true,
  },
  {
    id: "proj-sinnar-industrial-park",
    title: "Sinnar Industrial & Logistics Park",
    developer: "Pruthviraj Strategic Advisory",
    location: "Sinnar MIDC Outer Corridor, Nashik",
    city: "Nashik",
    type: "Township",
    status: "Under Construction",
    configurations: ["0.5 Acre to 5 Acre Industrial Plots", "Pre-engineered Warehouses"],
    priceStarting: "₹85 Lakh onwards",
    reraId: "P51600099004 (Demo)",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Engineered specifically for manufacturing units, engineering workshops, cold-chains, and regional distribution centres with heavy axle roadway access.",
    highlights: [
      "Dedicated high-tension power line infrastructure",
      "Continuous industrial water supply network",
      "Direct frontage on proposed Samruddhi Mahamarg feeder route",
      "Approved for red/orange/green category industries",
    ],
    amenities: ["Weighbridge Facility", "Truck Terminal & Driver Rest Lounge", "Administrative Block", "Fire Hydrant Network"],
    connectivity: ["10 mins from Sinnar town", "35 mins from Nashik City", "Direct access to Pune-Nashik & Mumbai corridors"],
    possessionDate: "August 2026",
    isFeatured: false,
  },
]
