export const DEFAULT_PORT = 8000;

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

export const ROUTES = {
  USERS: '/users',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const TYPES = {
  App: Symbol.for('App'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  ILogger: Symbol.for('ILogger'),
  UsersController: Symbol.for('UsersController'),
  UsersService: Symbol.for('UsersService'),
};
