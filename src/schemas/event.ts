import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  registrant: z.string(),
  content: z.string().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date format',
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date format',
  }),
})

export const eventWithoutIdSchema = eventSchema.omit({ id: true })
export const eventsListSchema = z.array(eventSchema)

export type EventsList = z.infer<typeof eventsListSchema>
export type Event = z.infer<typeof eventSchema>
export type EventWithoutId = z.infer<typeof eventWithoutIdSchema>
