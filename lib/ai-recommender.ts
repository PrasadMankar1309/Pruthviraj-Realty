import { properties, type Property, type PropertyCategory } from "@/data/properties"

export interface RecommenderInput {
  budget?: number // max budget in INR
  minBudget?: number
  location?: string // e.g. "Gangapur Road"
  category?: PropertyCategory | string
  areaMinSqFt?: number
  purpose?: "Self-Use" | "Weekend Home" | "Investment" | "Commercial" | "Agriculture"
  preferredFeatures?: string[]
}

export interface RecommendationMatch {
  property: Property
  score: number // 0 to 100
  matchReasons: string[]
  cautionNotes?: string[]
}

export interface RecommenderResult {
  matches: RecommendationMatch[]
  totalEvaluated: number
  summary: string
  suggestedAlternative?: string
}

/**
 * Intelligent rule-based matching engine that runs on active inventory
 * Pluggable for LLM enhancement while ensuring 0% hallucination of listings.
 */
export function recommendProperties(input: RecommenderInput): RecommenderResult {
  const evaluated = properties.map((prop) => {
    let score = 50 // baseline score
    const reasons: string[] = []
    const cautions: string[] = []

    // 1. Hard/Soft Category Match
    if (input.category && input.category !== "All") {
      if (prop.category.toLowerCase().includes(input.category.toLowerCase())) {
        score += 25
        reasons.push(`Exact match for category: ${prop.category}`)
      } else {
        score -= 20
      }
    }

    // 2. Location match
    if (input.location && input.location !== "All") {
      const locMatch =
        prop.location.toLowerCase().includes(input.location.toLowerCase()) ||
        prop.city.toLowerCase().includes(input.location.toLowerCase())
      if (locMatch) {
        score += 20
        reasons.push(`Situated in desired location: ${prop.location}`)
      }
    }

    // 3. Budget constraints
    if (input.budget && input.budget > 0) {
      if (prop.priceOnRequest) {
        score += 5
        reasons.push("High-value exclusive listing (Price on Request)")
      } else if (prop.price <= input.budget) {
        score += 20
        const saving = Math.round(((input.budget - prop.price) / input.budget) * 100)
        reasons.push(`Comfortably within budget (${saving}% under budget ceiling)`)
      } else if (prop.price <= input.budget * 1.15) {
        score -= 5
        cautions.push("Slightly exceeds target budget by less than 15%")
      } else {
        score -= 35
      }
    }

    // 4. Area constraints
    if (input.areaMinSqFt && input.areaMinSqFt > 0) {
      if (prop.areaSqFt && prop.areaSqFt >= input.areaMinSqFt) {
        score += 15
        reasons.push(`Exceeds minimum area criteria (${prop.area})`)
      }
    }

    // 5. Purpose-specific heuristics
    if (input.purpose) {
      if (input.purpose === "Weekend Home" && prop.category === "Farmhouse Plot") {
        score += 20
        reasons.push("Ideal micro-climate and topography for a weekend retreat")
      } else if (input.purpose === "Investment" && (prop.category === "Large Land Parcel" || prop.category === "Commercial Plot" || prop.category === "Agricultural Land")) {
        score += 20
        reasons.push("High capital appreciation potential along growth corridors")
      } else if (input.purpose === "Self-Use" && (prop.category === "Residential Plot" || prop.category === "Flat / Apartment" || prop.category === "Row House / Villa")) {
        score += 20
        reasons.push("Ready for residential development and family living")
      }
    }

    // Normalize score
    const finalScore = Math.max(10, Math.min(99, score))

    return {
      property: prop,
      score: finalScore,
      matchReasons: reasons.length > 0 ? reasons : ["General portfolio match based on availability"],
      cautionNotes: cautions.length > 0 ? cautions : undefined,
    }
  })

  // Filter out properties that had severe disqualifications
  const validMatches = evaluated
    .filter((m) => m.score >= 50)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)

  let summary = ""
  let alternative: string | undefined = undefined

  if (validMatches.length > 0) {
    summary = `Found ${validMatches.length} high-confidence matching properties in our active Nashik portfolio.`
  } else {
    summary = "No exact property matches your strict criteria in our active catalog."
    alternative = "Consider exploring adjacent locations like Trimbakeshwar or Gangapur Road, or submit a custom Buyer Requirement form so our team can scout off-market parcels."
  }

  return {
    matches: validMatches,
    totalEvaluated: properties.length,
    summary,
    suggestedAlternative: alternative,
  }
}
