import { Product } from '../../types/Product';
import { ServiceResponseError } from '../../types/ServiceResponse';
import schemaProducts from './schemas';

const validateProduct = (keysObjectToValidate: Product): ServiceResponseError | void => {
  const { error } = schemaProducts.validate(keysObjectToValidate);
  
  if (error) return { status: 'UNPROCESSABLE_CONTENT', data: { message: error.message } };
};

export default validateProduct;