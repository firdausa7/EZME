import app from '../backend/src/app.js';

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        console.error('Unhandled error in Express:', err);
        res.status(500).json({ error: err.message || 'Internal server error', stack: err.stack });
        resolve();
      } else {
        resolve();
      }
    });
  });
}
