export type Incident = {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium";
  status: "Open" | "Resolved";
  createdAt: string;
  description: string;
};