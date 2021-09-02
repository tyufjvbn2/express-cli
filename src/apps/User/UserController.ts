import { Request, Response } from 'express'
import User from './UserService'

export const list = async (_: Request, res: Response) => {
  const response = await User.list()
  res.json(response);
}

export const create = async (req: Request, res: Response) => {
  const response = await User.create(req.body);
  res.json(response)
}

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await User.findOne(id);
  res.json(response)
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await User.update(id, req.body);
  res.json(response)
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await User.delete(id);
  res.json(response)
}