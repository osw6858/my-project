import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string().nonempty({ message: 'ID는 빈 문자열일 수 없습니다.' }),
  title: z.string().nonempty({ message: '제목은 빈 문자열일 수 없습니다.' }),
  registrant: z
    .string()
    .nonempty({ message: '등록자는 빈 문자열일 수 없습니다.' }),
  content: z.string().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: '올바르지 않은 날짜 포멧',
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: '올바르지 않은 날짜 포멧',
  }),
})

export const eventWithoutIdSchema = eventSchema.omit({ id: true })
export const eventsListSchema = z.array(eventSchema)

export type EventsList = z.infer<typeof eventsListSchema>
export type Event = z.infer<typeof eventSchema>
export type EventWithoutId = z.infer<typeof eventWithoutIdSchema>
