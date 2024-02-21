import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Token } from '../../../src/types/Token';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const missingPropertiesMessage = { "message": "\"username\" and \"password\" are required" };
  const badUsernameOrPasswordMessage = { "message": "Username or password invalid" };
  const token = { token: 'strongJwt' }

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('Returns jwt login with valid login data.', async function () {
    // Arrange
    req.body = loginMock.validLoginBody;
    const serviceResponse: ServiceResponse<Token> = { status: 'SUCCESSFUL', data: token}
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(token);
  });
  it('Throws an error when missing property "username".', async function () {
    // Arrange
    req.body = loginMock.noUsernameLoginBody;
    const serviceResponse: ServiceResponse<Token> = {
      status: 'BAD_REQUEST',
      data: missingPropertiesMessage,
    }
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(missingPropertiesMessage);
  });
  it('Throws an error when missing property "password".', async function () {
    // Arrange
    req.body = loginMock.noPasswordLoginBody;
    const serviceResponse: ServiceResponse<Token> = {
      status: 'BAD_REQUEST',
      data: missingPropertiesMessage,
    }
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(missingPropertiesMessage);
  });
  it('Throws an error passing inexistent user.', async function () {
    // Arrange
    req.body = loginMock.notExistingUsername;
    const serviceResponse: ServiceResponse<Token> = {
      status: 'UNAUTHORIZED',
      data: badUsernameOrPasswordMessage,
    }
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith(badUsernameOrPasswordMessage);
  });
  it('Throws an error passing wrong password.', async function () {
    // Arrange
    req.body = loginMock.notExistingPassword;
    const serviceResponse: ServiceResponse<Token> = {
      status: 'UNAUTHORIZED',
      data: badUsernameOrPasswordMessage,
    }
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith(badUsernameOrPasswordMessage);
  });
});
