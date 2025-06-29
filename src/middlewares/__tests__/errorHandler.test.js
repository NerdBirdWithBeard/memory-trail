const errorHandler = require('../errorHandler');

describe('errorHandler middleware', () => {
    let res, req, next;

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        req = {};
        next = jest.fn();
    });

    it('handles unknown errors', () => {
        const err = new Error('Something went wrong');
        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it('handles Prisma P2002 error (duplicate key)', () => {
        const err = {
            name: 'PrismaClientKnownRequestError',
            code: 'P2002',
            meta: {target: 'email'}
        };

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Record with such field value "email" already exists',
        });
    });

    it('handles Prisma P2025 error (record not found)', () => {
        const err = {
            name: 'PrismaClientKnownRequestError',
            code: 'P2025'
        };

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Record not found. Nothing was deleted or updated',
        });
    });
    
    it('handles Prisma validation error', () => {
        const err = {
            name: 'PrismaClientValidationError',
            message: 'Invalid data'
        };

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Request validation error Prisma: "Invalid data"',
        });
    });

});
