import { Request, Response, Router } from 'express';
import { createUser, fetchUser, verifyUserPassword } from "../controller/userController";
import { createTaskInDB, fetchTasks } from "../controller/taskController";
import authenticateToken from "../authMiddleware/";
const jwt = require('jsonwebtoken');

export default function authSubscribe(router: Router): Router {
  router.post("/register", registerUser);
  router.post("/login", signin);
  router.get("/user/:id", authenticateToken, getUser);
  router.post("/create-task", authenticateToken, createTask);
  router.get("/list-tasks", authenticateToken, listTasks);
  return router;
}

async function registerUser(req: Request, res: Response) {
  try {
    const response = await createUser(req.body);
    if(response)
      return res.status(201).json({ user: { id: response, email: req.body.email } });

    return res.status(400).json({ message: "User Already Exists" });
  } catch(error) {
    console.error('Error while registering user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function signin(req: Request, res: Response) {
  try {
    const response = await verifyUserPassword(req.body);
    if(response) {
      const token = jwt.sign({ userId: response }, 'secret-key', { expiresIn: '1h' });
      return res.status(200).json({ jwt: token });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch(error) {
    console.error('Error while signing in:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const response = await fetchUser(req.params.id);
    if (response) {
      return res.status(200).json({ user: { id: response._id, email: response.email } });
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error while fetching user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function createTask(req: Request, res: Response) {
  try {
    const response = await createTaskInDB(req.body);
    return res.status(201).json({ task: { id: response, name: req.body.name } });
  } catch (error) {
    console.error('Error while creating task:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function listTasks(req: Request, res: Response) {
  try {
    const response = await fetchTasks();
    if (response) {
      return res.status(200).json({ tasks: response });
    }

    return res.status(404).json({ message: 'No tasks found' });
  } catch (error) {
    console.error('Error while fetching tasks:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
