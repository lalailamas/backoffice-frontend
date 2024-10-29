if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const { worker } = require('./browser');
    worker.start();
  }
  