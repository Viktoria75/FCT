

import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../../domain/models/User';

class UserController {
  async register(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user: Partial<IUser> = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      };
      const newUser = await UserRepository.create(user as IUser);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // async login(req: Request, res: Response) {
  //   const { email, password } = req.body;
  //   try {
  //     const user = await UserRepository.findByEmail(email);
  //     if (!user || !(await bcrypt.compare(password, user.password))) {
  //       return res.status(401).json({ error: 'Invalid credentials' });
  //     }

  //     const tokenPayload = { _id: user._id, email: user.email};
  //     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '1h' });
      
  //     res.json({ token, userId: user._id });
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await UserRepository.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const tokenPayload = { _id: user._id, email: user.email, role: user.role };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
      res.json({ token, userId: user._id, userRole: user.role });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await UserRepository.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({error:'Internal server error'});
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { password, ...rest } = req.body;

      let updatedUser;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedUser = await UserRepository.update(req.params.userId, {
          ...rest,
          password: hashedPassword,
        });
      } else {
        updatedUser = await UserRepository.update(req.params.userId, rest);
      }

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const deletedUser = await UserRepository.delete(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UserController();
