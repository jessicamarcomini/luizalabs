import axios, { AxiosRequestConfig } from "axios";
const expect  = require('chai').expect;
import * as utils from './utils';

describe('00-clientes', function() {

    it('should get all customers in the database from GET /clientes', async function() {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `http://localhost:8080/clientes`,
            headers: {
                'Authorization': `Basic ${utils.encodedToken}`
            }
        }

        const customers = await axios.request(options);
        const data = customers.data.data;
        
        expect(data).not.to.be.undefined;

        const email = 'je.marcom@gmail.com';
        const foundEmail = data.find(customer => customer.email == email);
        
        expect(foundEmail).not.to.be.undefined;
    });
});
