"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit2, ArrowUpDown } from "lucide-react"
import type { Incident, SortConfig } from "@/lib/types"
import { SeverityBadge } from "@/components/severity-badge"
import { StatusBadge } from "@/components/status-badge"
import { formatDate } from "@/lib/utils"

interface IncidentTableProps {
  incidents: Incident[]
  onEdit: (incident: Incident) => void
  sortConfig: SortConfig
  onSort: (sortConfig: SortConfig) => void
}

export function IncidentTable({ incidents, onEdit, sortConfig, onSort }: IncidentTableProps) {
  const handleSort = (field: string) => {
    const direction = sortConfig.field === field && sortConfig.direction === "asc" ? "desc" : "asc"
    onSort({ field, direction })
  }

  const getSortIcon = (field: string) => {
    if (sortConfig.field !== field) return null

    return <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === "asc" ? "rotate-180" : ""}`} />
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
              ID {getSortIcon("id")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
              Date {getSortIcon("date")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
              Type {getSortIcon("type")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("severity")}>
              Severity {getSortIcon("severity")}
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status {getSortIcon("status")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("affectedSystems")}>
              Affected Systems {getSortIcon("affectedSystems")}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No incidents found. Add a new incident to get started.
              </TableCell>
            </TableRow>
          ) : (
            incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell className="font-medium">{incident.id}</TableCell>
                <TableCell>{formatDate(incident.date)}</TableCell>
                <TableCell>{incident.type}</TableCell>
                <TableCell>
                  <SeverityBadge severity={incident.severity} />
                </TableCell>
                <TableCell className="max-w-xs truncate">{incident.description}</TableCell>
                <TableCell>
                  <StatusBadge status={incident.status} />
                </TableCell>
                <TableCell>{incident.affectedSystems.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(incident)}>
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
