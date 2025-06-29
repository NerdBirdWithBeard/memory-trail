const authService = require('../auth.services');
const prisma = require('../../lib/prisma');
const bcrypt = require('bcrypt');

jest.mock('../../lib/prisma');
jest.mock('bcrypt');

describe('register function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const email = 'test@example.com';
    const passwordHash = 'hashedPassword';

    it('hashes the password and create user', async () => {
        bcrypt.hash.mockResolvedValue('hashedPassword');

        prisma.user.create.mockResolvedValue({
            id: 'uuid-123',
            email: email,
            passwordHash: passwordHash
        });

        const user = { email: email, password: 'plainPassword' };
        const result = await authService.register(user);

        expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 10);
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                email: email,
                passwordHash: passwordHash
            }
        });

        expect(result).toEqual({
            id: 'uuid-123',
            email: email,
            passwordHash: passwordHash
            });
    });

    it('should throw if bcrypt.hash thwrows', async () => {
        bcrypt.hash.mockRejectedValue(new Error('bcrypt error'));

        await expect(authService.register({ email: email, passwordHash: passwordHash }))
            .rejects
            .toThrow('bcrypt error');

    });

});
