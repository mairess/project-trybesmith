import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Returns message "Name is required" when it is empty.', async function () {
    // Arrange
    const body = productsMock.missingNameProduct;
    // Act
    const httpResponse = await chai.request(app)
      .post('/products')
      .send(body)
    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.eq({"message": "Name is required"})
  })
});
