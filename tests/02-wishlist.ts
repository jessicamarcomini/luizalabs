import axios, { AxiosRequestConfig } from "axios";
import * as utils from './utils';
import * as db from '../src/database';
const expect  = require('chai').expect;

describe('02-wishlist', function() {

    before(async function() {
        await db.addCustomer({
            name: 'Mocha User',
            email: utils.mochaUserEmail
        })
    });

    after(async function() {
        await utils.cleanupDatabase();        
    });

    it('should not add id if product does not exist', async function() {
        const productId = 'produtoNaoExiste';

        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `http://localhost:8080/clientes/wishlist/adicionar`,
            headers: {
                'Authorization': `Basic ${utils.encodedToken}`
            },
            data: {
                email: utils.mochaUserEmail,
                productId: productId
            }
        }

        await axios.request(options);
        await utils.asyncTimeout(3000);
    
        const wishlist = await db.getCustomerProductIds(utils.mochaUserEmail);

        expect(wishlist.length).to.be.equal(0);        
    });

    it('should add product to wishlist and not allow duplicated ids', async function() {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `http://localhost:8080/clientes/wishlist/adicionar`,
            headers: {
                'Authorization': `Basic ${utils.encodedToken}`
            },
            data: {
                email: utils.mochaUserEmail,
                productId: utils.exampleProductId
            }
        }

        await axios.request(options);
        await utils.asyncTimeout(3000);

        await axios.request(options);
        const wishlist = await db.getCustomerProductIds(utils.mochaUserEmail);

        const productId = wishlist.filter(id => id == utils.exampleProductId);
        expect(productId.length).to.be.equal(1);
    });

    it('should remove product from the wishlist', async function() {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `http://localhost:8080/clientes/wishlist/remover`,
            headers: {
                'Authorization': `Basic ${utils.encodedToken}`
            },
            data: {
                email: utils.mochaUserEmail,
                productId: utils.exampleProductId
            }
        }

        await axios.request(options);
        await utils.asyncTimeout(3000);

        await axios.request(options);
        const wishlist = await db.getCustomerProductIds(utils.mochaUserEmail);

        const productId = wishlist.filter(id => id == utils.exampleProductId);
        expect(productId.length).to.be.equal(0);
    });
});
