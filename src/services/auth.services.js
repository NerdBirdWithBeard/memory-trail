const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const config = require('../config/auth.json');

async function hashPassword (plainPassword) {
    const saltRounds = config.saltRounds;
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
}

module.exports.register = async (data) => {
    const { email, password } = data;
    
    const hashedPassword = await hashPassword(password);
    
    const userData = await prisma.user.create({
        data: {
            email: email,
            passwordHash: hashedPassword,
        }
    });
    
    return userData;
};
