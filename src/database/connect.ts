import { createConnection } from 'typeorm';

createConnection().then(() => console.log('Successfuly connected with database'));
