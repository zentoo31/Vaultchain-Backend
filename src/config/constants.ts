import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || '3000';
export const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/mydatabase';
if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRATION) {
  throw new Error('JWT_SECRET or JWT_EXPIRATION is not defined in environment variables');
}

export const JWT_SECRET = process.env.JWT_SECRET as string;
