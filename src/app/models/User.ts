import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  isAuth: boolean;

  @Column()
  password: string;

  @Column()
  lastPass: string;  

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
    this.lastPass = this.password;
  };

  @BeforeUpdate()
  hashPassBeforeUpdate() {
    if(this.lastPass !== this.password) {
      this.hashPassword();
    }
  };

};

export default User;
