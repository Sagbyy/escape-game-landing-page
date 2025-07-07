import { rest } from 'msw';
import type { Session } from 'react-router';

let sessions: Session[] = [];

export const handlers = [
  rest.post('/api/sessions', async (req, res, ctx) => {
    const newSession = await req.json();
    sessions.push(newSession);
    return res(ctx.status(201), ctx.json({ message: 'Session créée' }));
  }),

  rest.get('/api/sessions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sessions));
  })
];
