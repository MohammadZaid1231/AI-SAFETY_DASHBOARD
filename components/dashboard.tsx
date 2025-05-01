"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { IncidentTable } from "@/components/incident-table"
import { IncidentForm } from "@/components/incident-form"
import { FilterBar } from "@/components/filter-bar"
import { useIncidents } from "@/hooks/use-incidents"
import type { Incident } from "@/lib/types"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncidentCards } from "@/components/incident-cards"

export default function Dashboard() {
  const { incidents, addIncident, updateIncident, filteredIncidents, setFilters, filters, setSortConfig, sortConfig } =
    useIncidents()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null)

  const handleAddNew = () => {
    setEditingIncident(null)
    setIsFormOpen(true)
  }

  const handleEdit = (incident: Incident) => {
    setEditingIncident(incident)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (incident: Incident) => {
    if (editingIncident) {
      updateIncident(incident)
    } else {
      addIncident(incident)
    }
    setIsFormOpen(false)
  }

  const handleFormCancel = () => {
    setIsFormOpen(false)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <DashboardHeader />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Safety Incidents</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Incident
        </Button>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      <Card>
        <CardHeader>
          <CardTitle>Incident Overview</CardTitle>
          <CardDescription>Manage and monitor AI safety incidents across all systems</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <IncidentTable
                incidents={filteredIncidents}
                onEdit={handleEdit}
                sortConfig={sortConfig}
                onSort={setSortConfig}
              />
            </TabsContent>
            <TabsContent value="cards">
              <IncidentCards incidents={filteredIncidents} onEdit={handleEdit} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isFormOpen && (
        <IncidentForm incident={editingIncident} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
      )}
    </div>
  )
}
