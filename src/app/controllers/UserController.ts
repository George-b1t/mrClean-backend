import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import sendEmail from '../../services/sendEmail';

class UserController {
  async index(req: Request, res: Response) {
    return res.send({ userID: req.userId });
  };

  async store(req: Request, res: Response) {
    try {  
      const repository = getRepository(User);
      const { name, email, password } = req.body;

      const userExists = await repository.findOne({where: { email }});

      if(userExists) {
        console.log(userExists)
        return res.sendStatus(409);
      };

      const user = repository.create({ name, email, password });
      await repository.save(user);

      const token = jwt.sign({ id: user.id }, 'auth2020', { expiresIn: 1200 });

      sendEmail(name, email, token);
      
      return res.sendStatus(201);
    }catch(err) {
      return res.send(err).sendStatus(409);
    }
  };
};

export default new UserController();