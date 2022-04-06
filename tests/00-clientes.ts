import axios, { AxiosRequestConfig } from "axios";
const expect  = require('chai').expect;
import * as utils from './utils';
import * as db from '../src/database';

describe('00-clientes', function() {

    before(async function() {
        await db.addCustomer({
            name: 'Mocha User',
            email: utils.mochaUserEmail
        })
    });

    after(async function() {
        await utils.cleanupDatabase();
    });


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

        const foundEmail = data.find(customer => customer.email == utils.mochaUserEmail);

        expect(foundEmail).not.to.be.undefined;
    });
});
