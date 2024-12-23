import { z } from 'zod'

export const MessageTypeEnum = ['text', 'card', 'file'] as const
export type MessageType = (typeof MessageTypeEnum)[number]

export const FileSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  fileData: z.string(),
})

export const MessageSchema = z.object({
  type: z.enum(MessageTypeEnum),
  content: z.string(),
  introduce: z.string().optional(),
  url: z.string().optional(),
  tel: z.string().optional(),
  file: FileSchema.optional(),
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
  file: FileSchema.optional(),
})

export type Message = z.infer<typeof MessageSchema>
export type UserType = z.infer<typeof UserTypeSchema>
export type IncomingPrivateMessage = z.infer<
  typeof IncomingPrivateMessageSchema
>
export type File = z.infer<typeof FileSchema>
