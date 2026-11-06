import PropertyListingPage from "@/components/property-listing-page"

interface CategoryPageProps {
  title: string
  subtitle: string
  category: import("@/data/properties").PropertyCategory
}

export default function CategoryListingPage(props: CategoryPageProps) {
  return <PropertyListingPage {...props} />
}
