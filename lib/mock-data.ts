import type { Incident } from "@/lib/types"
import { generateId } from "@/lib/utils"

export const mockIncidents: Incident[] = [
  {
    id: generateId(),
    date: new Date(2023, 10, 15, 9, 30).toISOString(),
    type: "Model Hallucination",
    severity: "High",
    description:
      "AI model generated factually incorrect information about medical treatments, potentially endangering users.",
    status: "In Progress",
    affectedSystems: ["LLM Service", "Content Moderation"],
    mitigationSteps: "Temporarily disabled medical advice feature. Engineering team investigating model behavior.",
  },
  {
    id: generateId(),
    date: new Date(2023, 10, 10, 14, 15).toISOString(),
    type: "Data Leak",
    severity: "Critical",
    description:
      "User conversation data was inadvertently exposed to unauthorized third parties due to a misconfiguration in the API gateway.",
    status: "Resolved",
    affectedSystems: ["API Gateway", "Database"],
    mitigationSteps: "Fixed API gateway configuration, conducted security audit, notified affected users.",
  },
  {
    id: generateId(),
    date: new Date(2023, 10, 5, 11, 45).toISOString(),
    type: "Bias Detection",
    severity: "Medium",
    description:
      "AI system showed gender bias in job recommendation feature, consistently suggesting lower-paying roles to female users.",
    status: "In Progress",
    affectedSystems: ["Recommendation Engine"],
    mitigationSteps: "Analyzing training data for bias sources, implementing fairness constraints in the model.",
  },
  {
    id: generateId(),
    date: new Date(2023, 9, 28, 16, 20).toISOString(),
    type: "Security Breach",
    severity: "Critical",
    description: "Unauthorized access to admin dashboard detected, potentially exposing system configuration details.",
    status: "Closed",
    affectedSystems: ["User Authentication", "Frontend Interface"],
    mitigationSteps: "Reset all admin credentials, implemented additional 2FA, patched security vulnerability.",
  },
  {
    id: generateId(),
    date: new Date(2023, 9, 20, 8, 10).toISOString(),
    type: "Performance Degradation",
    severity: "Low",
    description: "AI response time increased by 300% during peak hours, affecting user experience.",
    status: "Resolved",
    affectedSystems: ["LLM Service", "Data Processing Pipeline"],
    mitigationSteps: "Optimized model inference, added additional computing resources, implemented better caching.",
  },
  {
    id: generateId(),
    date: new Date(2023, 9, 15, 13, 5).toISOString(),
    type: "Harmful Output",
    severity: "High",
    description: "AI generated potentially harmful instructions when asked about certain chemical compounds.",
    status: "Resolved",
    affectedSystems: ["Content Moderation", "LLM Service"],
    mitigationSteps: "Enhanced content filtering, added specific guardrails for chemical-related queries.",
  },
  {
    id: generateId(),
    date: new Date(2023, 9, 8, 10, 30).toISOString(),
    type: "System Misuse",
    severity: "Medium",
    description: "Users attempting to use the system to generate spam content at scale.",
    status: "Open",
    affectedSystems: ["API Gateway", "LLM Service"],
    mitigationSteps: "Implementing rate limiting, enhancing usage pattern detection.",
  },
  {
    id: generateId(),
    date: new Date(2023, 9, 1, 9, 0).toISOString(),
    type: "Unauthorized Access",
    severity: "High",
    description: "Evidence of attempted credential stuffing attacks targeting user accounts.",
    status: "Closed",
    affectedSystems: ["User Authentication"],
    mitigationSteps:
      "Implemented CAPTCHA, forced password reset for potentially affected accounts, added login attempt limits.",
  },
]
