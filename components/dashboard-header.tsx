import { Card, CardContent } from "@/components/ui/card"
import { useIncidents } from "@/hooks/use-incidents"
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert } from "lucide-react"

export function DashboardHeader() {
  const { incidents } = useIncidents()

  // Calculate statistics
  const openIncidents = incidents.filter((i) => i.status === "Open").length
  const inProgressIncidents = incidents.filter((i) => i.status === "In Progress").length
  const resolvedIncidents = incidents.filter((i) => i.status === "Resolved" || i.status === "Closed").length
  const criticalIncidents = incidents.filter((i) => i.severity === "Critical" || i.severity === "High").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full mr-4">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Open Incidents</p>
            <h3 className="text-2xl font-bold">{openIncidents}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">In Progress</p>
            <h3 className="text-2xl font-bold">{inProgressIncidents}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full mr-4">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Resolved</p>
            <h3 className="text-2xl font-bold">{resolvedIncidents}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full mr-4">
            <ShieldAlert className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Critical</p>
            <h3 className="text-2xl font-bold">{criticalIncidents}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
