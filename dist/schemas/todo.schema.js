"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoSchema = exports.updateTodoSchema = exports.createTodoSchema = void 0;
const zod_1 = require("zod");
exports.createTodoSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(1, 'Title cannot be empty')
            .max(100, 'Title is too long'),
    }),
});
exports.updateTodoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid todo id'),
    }),
    body: zod_1.z
        .object({
        title: zod_1.z.string().min(1).max(100).optional(),
        completed: zod_1.z.boolean().optional(),
    })
        .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided',
    }),
});
exports.deleteTodoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid todo id'),
    }),
});
