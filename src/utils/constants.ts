export const DEFAULT_PORT = 8000;

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
};

export const ROUTES = {
  USERS: '/users',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const TYPES = {
  App: Symbol.for('App'),
  ILogger: Symbol.for('ILogger'),
  UsersController: Symbol.for('UsersController'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
};
