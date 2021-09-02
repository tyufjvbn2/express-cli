import { Router } from 'express'
import { validateUser } from './validator'
import * as controller from './UserController';
import 'express-async-errors';

const route = Router()

route.get('/', controller.list);
route.post('/', validateUser, controller.create);
route.get('/:id', controller.findOne);
route.put('/:id', controller.update);
route.delete('/:id', controller.deleteOne);

export default route;