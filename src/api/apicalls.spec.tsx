import axios from 'axios';
import * as apiCalls from './apicalls';

describe('apicalls', ()=>{
    describe('postStudent', ()=>{
        it('calls /api/v1.o/createStudent',()=>{
            const mockRegister = jest.fn();
            axios.post = mockRegister;
            apiCalls.postStudent();
        })
    });
});