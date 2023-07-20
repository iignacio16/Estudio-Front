export type Event = {
    id: string
    title: string
    description: string
    date: Date
    startHour: number
    endHour: number
  }

export type getEventsQuery = {
  events: Event[]
}