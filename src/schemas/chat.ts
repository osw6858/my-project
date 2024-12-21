import { z } from 'zod'

export const MessageTypeEnum = ['text', 'card'] as const
export type MessageType = (typeof MessageTypeEnum)[number]

export const MessageSchema = z.object({
  type: z.enum(MessageTypeEnum),
  content: z.string().optional(),
  introduce: z.string().optional(),
  url: z.string().optional(),
  tel: z.string().optional(),
  fromSelf: z.boolean(),
})

export const UserTypeSchema = z.object({
  userID: z.string(),
  username: z.string(),
  self: z.boolean(),
  connected: z.boolean(),
  messages: z.array(MessageSchema),
  hasNewMessages: z.boolean(),
})

export const IncomingPrivateMessageSchema = z.object({
  content: z.string(),
  from: z.string(),
})

export type Message = z.infer<typeof MessageSchema>
export type UserType = z.infer<typeof UserTypeSchema>
export type IncomingPrivateMessage = z.infer<
  typeof IncomingPrivateMessageSchema
>
