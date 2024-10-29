import { rest } from 'msw';

export const handlers = [
  rest.post('https://api.fake-endpoint.com/login', (req, res, ctx) => {
    // Simulando una respuesta de inicio de sesión exitosa
    return res(
      ctx.status(200),
      ctx.json({ message: 'Logged in successfully', user: { role: 'admin' } })
    );
  }),

  rest.get('https://api.fake-endpoint.com/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 14.99 }
      ])
    );
  })
];
