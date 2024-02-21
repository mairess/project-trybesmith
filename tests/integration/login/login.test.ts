import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Login } from '../../../src/types/Login';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  const missingPropertiesMessage = { "message": "\"username\" and \"password\" are required" };
  const badUsernameOrPasswordMessage = { "message": "Username or password invalid" };
  it('Returns jwt login with valid login data.', async function () {
    // Arrange
    const body = loginMock.validLoginBody;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    // Act
    const httpResponse = await chai.request(app)
      .post('/login')
      .send(body)
    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token')
  })
  // it('change here', async function () {
  //   // Arrange
  //   const body = loginMock.validLoginBody;
  //   const mockCreateReturn = new Error('Internal error');
  //   sinon.stub(UserModel, 'findOne').rejects(mockCreateReturn);
  //   // Act
  //   const httpResponse = await chai.request(app)
  //     .post('/login')
  //     .send(body)
  //   // Assert
  //   expect(httpResponse.status).to.equal(500);
  //   expect(httpResponse.body).to.not.have.key('token')
  // })
  // it('Throws an error when missing property "username".', async function () {
  //   // Arrange
  //   const body = loginMock.noUsernameLoginBody;
  //   sinon.stub(UserModel, 'findOne').resolves(null);
  //   // Act
  //   const httpResponse = await chai.request(app)
  //     .post('/login')
  //     .send(body)
  //   // Assert
  //   expect(httpResponse.status).to.equal(400);
  //   expect(httpResponse.body).to.deep.equal(missingPropertiesMessage)
  // })
  // it('Throws an error when missing property "password".', async function () {
  //   // Arrange
  //   const body = loginMock.noPasswordLoginBody;
  //   sinon.stub(UserModel, 'findOne').resolves(null);
  //   // Act
  //   const httpResponse = await chai.request(app)
  //     .post('/login')
  //     .send(body)
  //   // Assert
  //   expect(httpResponse.status).to.equal(400);
  //   expect(httpResponse.body).to.deep.equal(missingPropertiesMessage)
  // })
  // it('Throws an error passing inexistent user.', async function () {
  //   // Arrange
  //   const body = loginMock.notExistingUsername;
  //   sinon.stub(UserModel, 'findOne').resolves(null);
  //   // Act
  //   const httpResponse = await chai.request(app)
  //     .post('/login')
  //     .send(body)
  //   // Assert
  //   expect(httpResponse.status).to.equal(401);
  //   expect(httpResponse.body).to.deep.equal(badUsernameOrPasswordMessage)
  // })
  // it('Throws an error passing wrong password.', async function () {
  //   // Arrange
  //   const body = loginMock.notExistingPassword;
  //   sinon.stub(UserModel, 'findOne').resolves(null);
  //   // Act
  //   const httpResponse = await chai.request(app)
  //     .post('/login')
  //     .send(body)
  //   // Assert
  //   expect(httpResponse.status).to.equal(401);
  //   expect(httpResponse.body).to.deep.equal(badUsernameOrPasswordMessage)
  // })
});
