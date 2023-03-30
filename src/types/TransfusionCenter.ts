export interface TransfusionCenter {
    id: string
    name: string
    address: string
    workingHours: string
}

export enum AppointmentStatus {
    Pending = 1,
    Cancelled = 2,
    Missed = 3,
    Done = 4
}