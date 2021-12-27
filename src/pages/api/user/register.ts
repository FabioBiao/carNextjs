import { NextApiResponse, NextApiRequest } from 'next';
import {register as registerLib} from '../../../lib/controllers/users';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            console.log('register Post');
            console.log(req.body);
            const newUser = await registerLib(req.body);
            
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