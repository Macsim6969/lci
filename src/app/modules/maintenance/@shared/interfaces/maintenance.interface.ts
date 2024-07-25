export interface MaintenanceDashboard {
  scheduled: number
  completed: number
  pending: number
  overdue: number
}

export interface MaintanceList {
  id: number
  name: string
  number: number
  date: Date
  maintenanceType: string
  option: string
  status?: string
}