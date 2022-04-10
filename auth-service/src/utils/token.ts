import * as jwt from 'jsonwebtoken';

const generateToken = (payload: { id: string; role: number }) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

export { verifyToken, generateToken };
