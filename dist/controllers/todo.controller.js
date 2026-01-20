"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const crypto_1 = require("crypto");
const todos = [];
const getTodos = (_req, res) => {
    res.json(todos);
};
exports.getTodos = getTodos;
const createTodo = (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = {
        id: (0, crypto_1.randomUUID)(),
        title,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
};
exports.createTodo = createTodo;
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.completed = completed ?? todo.completed;
    res.json(todo);
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(204).send();
};
exports.deleteTodo = deleteTodo;
