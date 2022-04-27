import jwt from 'jsonwebtoken';

const JWT_SECRET = 'ASD11';
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d',
    })
}

export default generateToken;