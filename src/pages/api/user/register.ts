import { NextApiResponse, NextApiRequest } from 'next';
import {register as registerLib} from '../../../lib/controllers/users';

interface User {
    user: any;
    message: string;
    code: number;
  }

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            console.log('register Post');
            console.log(req.body);
            const newUser:User = await registerLib(req.body) as User;
            
            console.log('result from lib');
            console.log(newUser);
            
            if (!newUser) {
                return res.status(400).json({ message: 'Error creating new User.' });
            }
            if(newUser.code == 400){
                return res.status(400).json({ message: newUser.message });
            }
            res.status(200).json(newUser);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .send({ error: 'Internal Server Error. Error retrieving data from database.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}