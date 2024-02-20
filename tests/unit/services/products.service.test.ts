import { expect } from 'chai';
import sinon from 'sinon';
import productMocks from '../../mocks/products.mock'
import ProductModel from '../../../src/database/models/product.model'
import productsService from '../../../src/services/products.service'

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
it('Creates a product.', async function () {
  // Arrange
  const parameters = productMocks.validProduct;
  const mockCreateReturn = ProductModel.build(productMocks.createdProduct);
  sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
  // Act
  const serviceResponse = await productsService.create(parameters);
  // Assert
  expect(serviceResponse.status).to.eq('SUCCESSFUL');
  expect(serviceResponse.data).to.deep.equal(productMocks.createdProduct);
})
it('Throws an error missing property "name".', async function () {
  // Arrange
  const parameters = productMocks.missingNameProduct;
  const mockCreateReturn = ProductModel.build(productMocks.createdProduct);
  sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
  // Act
  const serviceResponse = await productsService.create(parameters);
  // Assert
  expect(serviceResponse.status).to.eq('INVALID_DATA');
  expect(serviceResponse.data).to.deep.equal({ message: 'Name is required' });
})
});
