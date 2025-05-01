import { Badge } from "@/components/ui/badge"
import type { IncidentStatus } from "@/lib/types"

interface StatusBadgeProps {
  status: IncidentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case "Open":
        return "outline"
      case "In Progress":
        return "default"
      case "Resolved":
        return "secondary"
      case "Closed":
        return "secondary"
      default:
        return "default"
    }
  }

  return <Badge variant={getVariant() as any}>{status}</Badge>
}
