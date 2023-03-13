import { Router } from 'express';

import ProductController from './controllers/ProductController';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import OrderController from './controllers/OrderController';

import verifyAuth from './middlewares/verifyAuth';

const routes = Router();

routes.get('/products', ProductController.index);

routes.post('/auth/signin', AuthController.signIn);
routes.post('/auth/signup', AuthController.signUp);

routes.get('/users', verifyAuth, UserController.show);
routes.put('/users', verifyAuth, UserController.update);
routes.delete('/users', verifyAuth, UserController.destroy);

routes.post('/checkout', verifyAuth, OrderController.createCheckoutSession);
routes.post('/order', OrderController.saveOrderData);

export default routes;
