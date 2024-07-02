// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const auth = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     (req as any).user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).json({ error: 'Invalid token' });
//   }
// };

// export default auth;
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const auth = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     (req as any).user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).json({ error: 'Invalid token' });
//   }
// };

// export default auth;

// auth.ts middleware

// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// // Define a new interface extending Request
// interface AuthRequest extends Request {
//   user?: any; // Adjust this type as per your decoded JWT payload structure
// }

// const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.header('x-auth-token'); // Check header key
//   if (!token) {
//     return res.status(401).json({ error: 'Access denied, no token provided' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any; // Adjust type as per your JWT payload structure
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid token' });
//   }
// };



// const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.header('x-auth-token'); // Assuming token is sent in header

//   if (!token) {
//     return res.status(401).json({ error: 'Access denied, no token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any; // Adjust type as per your JWT payload structure
//     console.log('Decoded token:', decoded); 
//     req.user = decoded; // Set decoded user information to request object
//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid token' });
//   }
// };

// export default auth;

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define a new interface extending Request
export interface AuthRequest extends Request {
  user?: any; // Adjust this type as per your decoded JWT payload structure
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Check for token in headers
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Check header key and remove 'Bearer '

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any; // Adjust type as per your JWT payload structure

    // Attach decoded user information to request object
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error('Invalid token:');
    return res.status(400).json({ error: 'Invalid token' });
  }
};

export default auth;
