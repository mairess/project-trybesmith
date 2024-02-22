import { expect } from 'chai';
import sinon from 'sinon';
import productMocks from '../../mocks/products.mock'
import loginMocks from '../../mocks/login.mock'
import UserModel from '../../../src/database/models/user.model'
import ProductModel from '../../../src/database/models/product.model'
import productsService from '../../../src/services/products.service'

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
it('Creates a product.', async function () {
  // Arrange
  const parameters = productMocks.validProduct;
  const mockCreateReturn = ProductModel.build(productMocks.createdProduct);
  sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
  const mockFindByPkReturn = UserModel.build(loginMocks.existingUser);
  sinon.stub(UserModel, 'findByPk').resolves(mockFindByPkReturn);
  // Act
  const serviceResponse = await productsService.create(parameters);
  // Assert
  expect(serviceResponse.status).to.eq('CREATED');
  expect(serviceResponse.data).to.deep.equal(productMocks.createdProduct);
})

it('Does not create product passing inexistent userId.', async function () {
  // Arrange
  const parameters = productMocks.inexistentUserIdProduct;
  sinon.stub(UserModel, 'findByPk').resolves(null);
  // Act
  const serviceResponse = await productsService.create(parameters);
  // Assert
  expect(serviceResponse.status).to.eq('UNPROCESSABLE_CONTENT');
  expect(serviceResponse.data).to.deep.equal({ message: '"userId" not found' });
})
// it('Throws an error missing property "name".', async function () {
//   // Arrange
//   const parameters = productMocks.missingNameProduct;
//   const mockCreateReturn = ProductModel.build(productMocks.createdProduct);
//   sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
//   // Act
//   const serviceResponse = await productsService.create(parameters);
//   // Assert
//   expect(serviceResponse.status).to.eq('BAD_REQUEST');
//   expect(serviceResponse.data).to.deep.equal({ message: 'Name is required' });
// })
it('Returns all available products.', async function () {
  // Arrange
  const mockCreateReturn = ProductModel.bulkBuild(productMocks.createdProducts);
  sinon.stub(ProductModel, 'findAll').resolves(mockCreateReturn);
  // Act
  const serviceResponse = await productsService.list();
  // Assert
  expect(serviceResponse.status).to.eq('SUCCESSFUL');
  expect(serviceResponse.data).to.deep.equal(mockCreateReturn);
})
});
