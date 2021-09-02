import { Repository, DeleteResult } from 'typeorm'
import { plainToClass } from 'class-transformer';
import { CustomError } from 'express-handler-errors';
import { dbConnections } from "../../config/config"
import { User } from './User.entity';
import { connection } from '../../helper/getConnection';

class UserService {

  private readonly repository!: Repository<User>

  constructor() {
    this.repository = connection(User, dbConnections.mongo.name);
  }

  async list(): Promise<User[]> {
    return this.repository.find()
  }

  async create(obj: User): Promise<User> {
    const data = plainToClass(User, obj)
    return this.repository.save(data)
  }

  async findOne(id: string): Promise<User> {
    const service = await this.repository.findOne(id)
    if(!service) throw new CustomError({
      code: 'USER_NOT_FOUND',
      message: 'User not found',
      status: 404
    })
    return service
  }

  async update(id: string, obj: User): Promise<User> {

    await this.repository.update(id, obj);
    return this.findOne(id);

  }

  async delete(id: string): Promise<DeleteResult> {
    await this.findOne(id)
    return this.repository.delete(id);
  }

}

export default new UserService()
