import { Badge } from "@/components/ui/badge"
import type { IncidentSeverity } from "@/lib/types"

interface SeverityBadgeProps {
  severity: IncidentSeverity
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const getVariant = () => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "default"
    }
  }

  return <Badge variant={getVariant() as any}>{severity}</Badge>
}
