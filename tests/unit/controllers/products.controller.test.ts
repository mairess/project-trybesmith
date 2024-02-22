import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productMocks from '../../mocks/products.mock'
import productsController from '../../../src/controllers/products.controller';
import productsService from '../../../src/services/products.service'
import ProductModel from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub().returnsThis();
    sinon.restore();
  });

  it('Creates a product', async function () {
    // Arrange
    req.body = productMocks.validProduct;
    sinon.stub(productsService, 'create').resolves({
      status: 'CREATED',
      data: productMocks.createdProduct,
    });
    // Act
    await productsController.create(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMocks.createdProduct);
  });

  it('Throws an error missing property "name".', async function () {
    // Arrange
    req.body = productMocks.missingNameProduct;
    sinon.stub(productsService, 'create').resolves({
      status: 'BAD_REQUEST',
      data: { message: 'Name is required' },
    });
    // Act
    await productsController.create(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'Name is required' });
  });
  it('Returns all available products.', async function () {
    // Arrange
    const mockCreateReturn = ProductModel.bulkBuild(productMocks.createdProducts)
    sinon.stub(productsService, 'list').resolves({
      status: 'SUCCESSFUL',
      data: mockCreateReturn,
    });
    // Act
    await productsController.list(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockCreateReturn);
  });

  it('Handles internal error when listing products.', async function () {
    // Arrange
    const mockCreateReturn = new Error('Internal error');
    sinon.stub(productsService, 'list').rejects(mockCreateReturn);
    // Act
    await productsController.list(req, res, next);
    // Assert
    expect(next).to.have.been.calledOnce;
    expect(next.args[0][0]).to.be.instanceOf(Error);
    expect(next.args[0][0].message).to.equal('Internal error');
  });
  

});
