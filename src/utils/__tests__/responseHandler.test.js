const responseHandler = require('../responseHandler');

describe('response handler', () => {

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('send success if result is valid', () => {
        const result = { id: 1 };
        responseHandler(res, result, 'Success');
        
        expect(res.json).toHaveBeenCalledWith( { message: 'Success', result } );
    });
    
    it('send fail with an empty object as result', () => {
        responseHandler(res, {}, 'Success');

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith( { error: 'Invalid data'} );
    });
    
    it('send custom fallback', () => {
        responseHandler(res, null, 'Success', 404, 'Fail');
        
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith( { error: 'Fail'} );
    });

});
