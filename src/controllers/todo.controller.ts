import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getTodos = async (_req: Request, res: Response) => {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const todo = await prisma.todo.create({
    data: { title },
  });

  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const { completed } = req.body;

  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });

    res.json(todo);
  } catch {
    res.status(404).json({ error: 'Todo not found' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id' });
  }
  try {
    await prisma.todo.delete({
      where: { id },
    });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'Todo not found' });
  }
};
