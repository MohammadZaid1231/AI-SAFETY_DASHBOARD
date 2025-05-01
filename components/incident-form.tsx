"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Incident, IncidentSeverity, IncidentStatus, IncidentType } from "@/lib/types"
import { MultiSelect } from "@/components/multi-select"
import { generateId } from "@/lib/utils"

interface IncidentFormProps {
  incident: Incident | null
  onSubmit: (incident: Incident) => void
  onCancel: () => void
}

const INCIDENT_TYPES: IncidentType[] = [
  "Data Leak",
  "Model Hallucination",
  "Bias Detection",
  "Security Breach",
  "Performance Degradation",
  "Harmful Output",
  "System Misuse",
  "Unauthorized Access",
]

const SEVERITY_LEVELS: IncidentSeverity[] = ["Critical", "High", "Medium", "Low"]

const STATUS_OPTIONS: IncidentStatus[] = ["Open", "In Progress", "Resolved", "Closed"]

const SYSTEM_OPTIONS = [
  "LLM Service",
  "Content Moderation",
  "User Authentication",
  "Data Processing Pipeline",
  "API Gateway",
  "Frontend Interface",
  "Database",
  "Recommendation Engine",
  "Search System",
  "Analytics Platform",
]

export function IncidentForm({ incident, onSubmit, onCancel }: IncidentFormProps) {
  const [formData, setFormData] = useState<Incident>({
    id: "",
    date: new Date().toISOString(),
    type: "Data Leak",
    severity: "Medium",
    description: "",
    status: "Open",
    affectedSystems: [],
    mitigationSteps: "",
  })

  useEffect(() => {
    if (incident) {
      setFormData(incident)
    } else {
      setFormData({
        id: generateId(),
        date: new Date().toISOString(),
        type: "Data Leak",
        severity: "Medium",
        description: "",
        status: "Open",
        affectedSystems: [],
        mitigationSteps: "",
      })
    }
  }, [incident])

  const handleChange = (field: keyof Incident, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{incident ? "Edit Incident" : "Add New Incident"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Incident Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCIDENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => handleChange("severity", value as IncidentSeverity)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEVERITY_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input
                id="date"
                type="datetime-local"
                value={new Date(formData.date).toISOString().slice(0, 16)}
                onChange={(e) => handleChange("date", new Date(e.target.value).toISOString())}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                placeholder="Describe the incident in detail..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value as IncidentStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="affectedSystems">Affected Systems</Label>
                <MultiSelect
                  options={SYSTEM_OPTIONS.map((system) => ({ label: system, value: system }))}
                  selected={formData.affectedSystems}
                  onChange={(selected) => handleChange("affectedSystems", selected)}
                  placeholder="Select systems..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mitigationSteps">Mitigation Steps</Label>
              <Textarea
                id="mitigationSteps"
                value={formData.mitigationSteps}
                onChange={(e) => handleChange("mitigationSteps", e.target.value)}
                rows={3}
                placeholder="Describe steps taken to mitigate the incident..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{incident ? "Update Incident" : "Add Incident"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
