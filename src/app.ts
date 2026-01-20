import express from 'express';
import todoRoutes from './routes/todo.routes';

const app = express();

app.use(express.json());
app.use('/todos', todoRoutes);

export default app;
