import axios, { AxiosRequestConfig } from "axios";
import * as utils from './utils';
import * as db from '../src/database';
const expect  = require('chai').expect;

describe('01-cadastro', function() {
    after(async function() {
        await utils.cleanupDatabase();        
    });

    it('should get customer from parameter email', async function() {
        const email = 'je.marcom@gmail.com';

        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `http://localhost:8080/clientes/cadastro/${email}`,
            headers: {
                'Authorization': `Basic ${utils.encodedToken}`
            }
        }

        const customer = await axios.request(options);
        const data = customer.data;
        
        expect(data).not.to.be.undefined;
        expect(data.data).to.have.property('name');
        expect(data.data).to.have.property('email');
        expect(data.data).to.have.property('wishlist');
    });

    it('should post customer info and add it to the database', async function() {
        const customer = {
            name: 'Mocha User',
            email: utils.mochaUserEmail
        };

        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `http://localhost:8080/clientes/cadastro/adicionar`,
            headers: {
                'Authorization': `Basic ${utils.encodedToken}`
            },
            data: {
                customer: customer
            }
        }

        await axios.request(options);
        await utils.asyncTimeout(3000);

        const newCustomer = await db.findCustomer(customer.email);
        await utils.asyncTimeout(3000);
        expect(newCustomer).not.to.be.undefined;
    });

    it('should update customer info in the database', async function() {
        const customer = {
            name: 'Mocha User Updated',
            email: utils.mochaUserEmail
        };

        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `http://localhost:8080/clientes/cadastro/atualizar`,
            headers: {
                'Authorization': `Basic ${utils.encodedToken}`
            },
            data: {
                email: customer.email,
                update: customer
            }
        }

        await axios.request(options);
        await utils.asyncTimeout(3000);

        const updatedCustomer = await db.findCustomer(customer.email);
        await utils.asyncTimeout(3000);
        expect(updatedCustomer).not.to.be.undefined;
        expect(updatedCustomer.name).to.be.equal(customer.name);
    });

    it('should remove customer from the database', async function() {
        const email = utils.mochaUserEmail;

        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `http://localhost:8080/clientes/cadastro/remover`,
            headers: {
                'Authorization': `Basic ${utils.encodedToken}`
            },
            data: {
                email: email
            }
        }

        await axios.request(options);
        await utils.asyncTimeout(3000);

        const removedCustomer = await db.findCustomer(email);
        await utils.asyncTimeout(3000);
        expect(removedCustomer).to.be.null;
    });
});
