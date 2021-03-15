import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class AuthController {
  async loginAuthenticate(req: Request, res: Response) {
    try{
      const repository = getRepository(User);
      const { email, password } = req.body;

      const user = await repository.findOne({ where: { email }});

      if(!user) {
        res.sendStatus(401);
      };

      if (user !== undefined) {
        const isValidPawword = await bcrypt.compare(password, user.password);

        if(!isValidPawword) {
          return res.sendStatus(401);
        };

        if(user.isAuth) {
          const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

          return res.json({
            token
          });
        }else{
          return res.sendStatus(401);
        }
      };
    }catch(err){
      return res.send(err).sendStatus(401);
    };
  };

  async emailAuthenticate(req: Request, res: Response) {
    try {
      const { token } = req.params;
      
      const data = jwt.verify(token, 'auth2020');

      if(data) {

        const { id } = data as TokenPayload;

        const repository = getRepository(User);

        const user = await repository.findOne({where: { id }});

        if(user) {

          user.isAuth = true;

          await repository.save(user);

          return res.sendStatus(202);
        };
      };

    } catch(err) {

      return res.sendStatus(401);
    };
   
  };
};

export default new AuthController();