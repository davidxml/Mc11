import { Router } from 'express';
import { getAllUsers, getUser } from '../controllers/User.controller.js';

const userRouter = Router();
// GET /users -> get all users 
userRouter.get('/', getAllUsers);

// POST /users -> create new Users
userRouter.post('/', (req, res) => res.send({title: 'Create a new user'}));

// GET /users/:id -> get user by id
userRouter.get('/:id', getUser);

// PUT /users/:id -> updates details of a user 
userRouter.put('/:id', (req, res) => res.send({title: 'Update details of a specific user'}));

// DELETE /user/:id -> deletes details of a user
userRouter.delete('/:id', (req, res) => res.send({title: 'Delete details of a specific user'}));

export default userRouter;