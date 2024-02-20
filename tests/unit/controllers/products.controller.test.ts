import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productMocks from '../../mocks/products.mock'
import productsController from '../../../src/controllers/products.controller';
import productsService from '../../../src/services/products.service'

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub().returnsThis();
    sinon.restore();
  });

  it('Creates a product', async function () {
    // Arrange
    req.body = productMocks.validProduct;
    sinon.stub(productsService, 'create').resolves({
      status: 'SUCCESSFUL',
      data: productMocks.createdProduct,
    });
    // Act
    await productsController.create(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMocks.createdProduct);
  });

  it('Throws an error missing property "name".', async function () {
    // Arrange
    req.body = productMocks.missingNameProduct;
    sinon.stub(productsService, 'create').resolves({
      status: 'INVALID_DATA',
      data: { message: 'Name is required' },
    });
    // Act
    await productsController.create(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'Name is required' });
  });

});
