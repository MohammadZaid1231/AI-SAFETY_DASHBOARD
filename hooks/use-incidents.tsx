"use client"

import { useState, useEffect, useMemo } from "react"
import type { Incident, IncidentFilters, SortConfig } from "@/lib/types"
import { mockIncidents } from "@/lib/mock-data"

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [filters, setFilters] = useState<IncidentFilters>({
    search: "",
    severity: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  })
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "date",
    direction: "desc",
  })

  // Initialize with mock data
  useEffect(() => {
    setIncidents(mockIncidents)
  }, [])

  // Add a new incident
  const addIncident = (incident: Incident) => {
    setIncidents((prev) => [...prev, incident])
  }

  // Update an existing incident
  const updateIncident = (updatedIncident: Incident) => {
    setIncidents((prev) => prev.map((incident) => (incident.id === updatedIncident.id ? updatedIncident : incident)))
  }

  // Filter incidents based on current filters
  const filteredIncidents = useMemo(() => {
    return incidents
      .filter((incident) => {
        // Search filter
        if (
          filters.search &&
          !Object.values(incident).some(
            (value) => typeof value === "string" && value.toLowerCase().includes(filters.search.toLowerCase()),
          )
        ) {
          return false
        }

        // Severity filter
        if (filters.severity && incident.severity !== filters.severity) {
          return false
        }

        // Status filter
        if (filters.status && incident.status !== filters.status) {
          return false
        }

        // Date range filter
        const incidentDate = new Date(incident.date)
        if (filters.dateFrom) {
          const fromDate = new Date(filters.dateFrom)
          if (incidentDate < fromDate) {
            return false
          }
        }

        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo)
          toDate.setHours(23, 59, 59, 999) // End of day
          if (incidentDate > toDate) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        const field = sortConfig.field

        // Handle different field types
        if (field === "date") {
          return sortConfig.direction === "asc"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        }

        if (field === "id") {
          return sortConfig.direction === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
        }

        // Handle string fields
        const aValue = a[field as keyof Incident]
        const bValue = b[field as keyof Incident]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        // Handle array fields (like affectedSystems)
        if (Array.isArray(aValue) && Array.isArray(bValue)) {
          return sortConfig.direction === "asc" ? aValue.length - bValue.length : bValue.length - aValue.length
        }

        return 0
      })
  }, [incidents, filters, sortConfig])

  return {
    incidents,
    filteredIncidents,
    addIncident,
    updateIncident,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
  }
}
