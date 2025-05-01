"use client"

import type { Incident } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"
import { SeverityBadge } from "@/components/severity-badge"
import { StatusBadge } from "@/components/status-badge"
import { formatDate } from "@/lib/utils"

interface IncidentCardsProps {
  incidents: Incident[]
  onEdit: (incident: Incident) => void
}

export function IncidentCards({ incidents, onEdit }: IncidentCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {incidents.length === 0 ? (
        <div className="col-span-full text-center py-6 text-muted-foreground">
          No incidents found. Add a new incident to get started.
        </div>
      ) : (
        incidents.map((incident) => (
          <Card key={incident.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{incident.type}</CardTitle>
                <SeverityBadge severity={incident.severity} />
              </div>
              <div className="text-sm text-muted-foreground">
                ID: {incident.id} • {formatDate(incident.date)}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm mb-4">{incident.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <StatusBadge status={incident.status} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Systems:</span>
                  <span className="text-right">{incident.affectedSystems.join(", ")}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 border-t">
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => onEdit(incident)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Incident
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
