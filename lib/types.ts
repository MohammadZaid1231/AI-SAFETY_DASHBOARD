export type IncidentSeverity = "Critical" | "High" | "Medium" | "Low"

export type IncidentStatus = "Open" | "In Progress" | "Resolved" | "Closed"

export type IncidentType =
  | "Data Leak"
  | "Model Hallucination"
  | "Bias Detection"
  | "Security Breach"
  | "Performance Degradation"
  | "Harmful Output"
  | "System Misuse"
  | "Unauthorized Access"

export interface Incident {
  id: string
  date: string
  type: IncidentType
  severity: IncidentSeverity
  description: string
  status: IncidentStatus
  affectedSystems: string[]
  mitigationSteps: string
}

export interface IncidentFilters {
  search: string
  severity: string
  status: string
  dateFrom: string
  dateTo: string
}

export interface SortConfig {
  field: string
  direction: "asc" | "desc"
}
