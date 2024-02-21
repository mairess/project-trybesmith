import { expect } from 'chai';
import sinon from 'sinon';
import userService from '../../../src//services/user.service'
import userMocks from '../../mocks/user.mock'
import UserModel from '../../../src/database/models/user.model';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Returns all users with their products id.', async function () {
    // Arrange
    const mockCreateReturn = UserModel.bulkBuild((userMocks.CreatedUsersWithProducts) as any);
    sinon.stub(UserModel, 'findAll').resolves(mockCreateReturn);
    // Act
    const serviceResponse = await userService.list();
    // Assert
    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    // expect(serviceResponse.data).to.deep.equal(userMocks.CreatedUsersWithProducts);
  })
});
