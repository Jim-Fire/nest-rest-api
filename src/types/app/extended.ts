import { Request } from 'express';
import { User } from 'src/types';

export interface Request extends Request {
    user: User;
}