import { expect } from 'chai';
import sinon from 'sinon';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  const missingPropertiesMessage = { "message": "\"username\" and \"password\" are required" };
  const badUsernameOrPasswordMessage = { "message": "Username or password invalid" };
  it('Returns jwt login with valid login data.', async function () {
    // Arrange
    const parameters = loginMock.validLoginBody;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    // Act
    const serviceResponse = await loginService.verifyLogin(parameters);

    // Assert
    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.have.key('token');
  });

  it('Throws an error when missing property "username".', async function () {
    // Arrange
    const parameters = loginMock.noUsernameLoginBody;

    // Act
    const serviceResponse = await loginService.verifyLogin(parameters);

    // Assert
    expect(serviceResponse.status).to.eq('BAD_REQUEST');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.eq(missingPropertiesMessage);  
  });

  it('Throws an error when missing property "password".', async function () {
    // Arrange
    const parameters = loginMock.noUsernameLoginBody;

    // Act
    const serviceResponse = await loginService.verifyLogin(parameters);

    // Assert
    expect(serviceResponse.status).to.eq('BAD_REQUEST');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.eq(missingPropertiesMessage);  
  });

  it('Throws an error passing inexistent user.', async function () {
    // Arrange
    const parameters = loginMock.notExistingUsername;
    sinon.stub(UserModel, 'findOne').resolves(null);

    // Act
    const serviceResponse = await loginService.verifyLogin(parameters);

    // Assert
    expect(serviceResponse.status).to.eq('UNAUTHORIZED');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.eq(badUsernameOrPasswordMessage);
  });

  it('Throws an error passing wrong password.', async function () {
    // Arrange
    const parameters = loginMock.notExistingPassword;
    sinon.stub(UserModel, 'findOne').resolves(null);

    // Act
    const serviceResponse = await loginService.verifyLogin(parameters);

    // Assert
    expect(serviceResponse.status).to.eq('UNAUTHORIZED');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.eq(badUsernameOrPasswordMessage);
  });
});
