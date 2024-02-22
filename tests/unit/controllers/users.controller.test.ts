import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import userService from '../../../src/services/user.service'
import userMocks from '../../mocks/user.mock'
import userController from '../../../src/controllers/user.controller';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Returns all available users.', async function () {
    // Arrange
    sinon.stub(userService, 'list').resolves({
      status: 'SUCCESSFUL',
      data: userMocks.CreatedUsersWithProductsFromService,
    });
    // Act
    await userController.list(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(userMocks.CreatedUsersWithProductsFromService);
  });

  it('Handles internal error when listing users.', async function () {
    // Arrange
    const mockCreateReturn = new Error('Internal error');
    sinon.stub(userService, 'list').rejects(mockCreateReturn);
    // Act
    await userController.list(req, res, next);
    // Assert
    expect(next).to.have.been.calledOnce;
    expect(next.args[0][0]).to.be.instanceOf(Error);
    expect(next.args[0][0].message).to.equal('Internal error');
  });

});
