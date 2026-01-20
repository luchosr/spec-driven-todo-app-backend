import { z } from 'zod';

export const createTodoSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title cannot be empty')
      .max(100, 'Title is too long'),
  }),
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid todo id'),
  }),
  body: z
    .object({
      title: z.string().min(1).max(100).optional(),
      completed: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided',
    }),
});

export const deleteTodoSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid todo id'),
  }),
});
