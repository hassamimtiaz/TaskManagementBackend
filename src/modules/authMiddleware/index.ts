import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

type Error = string | null;

export default function authenticateToken (req: Request, res: Response, next: NextFunction) {
  const headerToken = req.header('Authorization');

  if (!headerToken) {
    return res.status(401).json({
      message: 'Authentication failed: Token not found in the request header'
    });
  }

  const token = headerToken.split(" ")[1];

  jwt.verify(token, 'secret-key', (err: Error) => {
    if (err) {
      return res.status(403).json({
        message: 'Authentication failed: Invalid or expired token'
      });
    }
    next();
  });
};
