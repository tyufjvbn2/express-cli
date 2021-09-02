/* eslint-disable global-require */
import request from 'supertest';
import { MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';

const app = require('../../src/app').default;

jest.mock('../../src/middlewares/Logger');
jest.mock('typeorm')
describe('User Module Tests', () => {

  const repository = (require('typeorm').repositoryMock) as MockProxy<Repository<any>>

  test('Should returna list of Users', async () => {

    repository.find.mockResolvedValue([{ _id: '5e9dfe8bacb25e2e26c72916', name: 'User' }] as any)

    await request(app)
      .get('/user')
      .expect(200, [{ _id: '5e9dfe8bacb25e2e26c72916', name: 'User' }]);
  });

  test('should return one User', async () => {
    repository.findOne.mockResolvedValue({ _id: '5e9dfe8bacb25e2e26c72916', name: 'User' });
    await request(app)
      .get('/user/5e9dfe8bacb25e2e26c72916')
      .expect(200, { _id: '5e9dfe8bacb25e2e26c72916', name: 'User' });
  });

  test('should return error when User does not exists', async () => {
    repository.findOne.mockResolvedValue(undefined);
    await request(app)
      .get('/user/5e9dfe8bacb25e2e26c72916')
      .expect(404, {
        errors: [
          {
            "code": "USER_NOT_FOUND",
            "message": "User not found",
            "status": 404
          }
        ]
      })

  })

  test('should create one User', async () => {
    repository.save.mockResolvedValue({ _id: '5e9dfe8bacb25e2e26c72916', name: 'User' })
    await request(app)
      .post('/user')
      .send({ name: 'User' })
      .expect(200, { _id: '5e9dfe8bacb25e2e26c72916', name: 'User' });
  });

  test('should update one User', async () => {
    repository.update.mockResolvedValue({} as any);
    repository.findOne.mockResolvedValue({
      _id: '5e9dfe8bacb25e2e26c72916',
      name: 'User',
    });
    await request(app)
      .put('/user/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(200, { _id: '5e9dfe8bacb25e2e26c72916', name: 'User' });
  });

  test('should return error when update one User', async () => {
    repository.update.mockResolvedValue({} as any);
    repository.findOne.mockResolvedValue(undefined);
    await request(app)
      .put('/user/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(404, {
        errors: [
          {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            status: 404,
          },
        ],
      });
  });

  test('should delete one User', async () => {
    repository.delete.mockResolvedValue({} as any);
    repository.findOne.mockResolvedValue({
      _id: '5e9dfe8bacb25e2e26c72916',
      name: 'User',
    });
    await request(app)
      .delete('/user/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(200, { });
  });

  test('should return error when delete one User', async () => {
    repository.findOne.mockResolvedValue(undefined);
    await request(app)
      .delete('/user/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(404, {
        errors: [
          {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            status: 404,
          },
        ],
      });
  });
});
