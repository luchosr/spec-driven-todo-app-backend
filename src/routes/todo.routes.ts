import { Router } from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controller';
import { validate } from '../middlewares/validate';
import {
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
} from '../schemas/todo.schema';

const router = Router();

router.get('/', getTodos);

router.post('/', validate(createTodoSchema), createTodo);

router.patch('/:id', validate(updateTodoSchema), updateTodo);

router.delete('/:id', validate(deleteTodoSchema), deleteTodo);

export default router;
