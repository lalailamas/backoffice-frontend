import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Configurar el worker con los controladores definidos
export const worker = setupWorker(...handlers);
