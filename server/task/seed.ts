import "reflect-metadata";
import {createConnection} from "typeorm";
import { Seed } from '../seed/'

createConnection().then(async connection => {
   await Seed(connection);
   console.log("SUCCESSFULLY SEEDED DATABASE")
   await connection.close()
}).catch(error => console.log(error));