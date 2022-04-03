
import { MongoClient } from 'mongodb';
import { Customer, Wishlist } from './types';

const uri = "mongodb+srv://jessicamarcomini:KBWXdT2FI5ydSSPV@cluster0.gzyci.mongodb.net/luizalabs?retryWrites=true&w=majority";

export async function getCustomers(): Promise<Customer[]> {
    const client = new MongoClient(uri);
    await client.connect();

    let customers;
    try {
        customers = await client.db().collection('customers').find().toArray();
    } catch (err) {
        console.log(`Unable to add customer to the database. Err: ${err}`);
    } finally {
        await client.close();
        return customers;
    }
}

export async function findCustomer(email: string): Promise<Customer> {
    const client = new MongoClient(uri);
    await client.connect();

    let foundCustomer;
    try {
        foundCustomer = await client.db().collection('customers').findOne({ email: email });
    } catch (err) {
        console.log(`Unable to add customer to the database. Err: ${err}`);
    } finally {
        await client.close();
        return foundCustomer;
    }
}

export async function addCustomer(customer: Customer): Promise<boolean> {
    const client = new MongoClient(uri);
    await client.connect();

    const existingCustomer = await findCustomer(customer.email);
    if (!!existingCustomer) {
        console.error(`Email ${customer.email} already exists in the database.`);
        return false;
    }

    let found = false;
    try {
        await client.db().collection('customers').insertOne(customer);
        console.log('Customer was added to the database!');
        found = true;
    } catch (err) {
        console.log(`Unable to add customer to the database. Err: ${err}`);
    } finally {
        await client.close();
        return found;
    }
}

export async function updateCustomer(email: string, newName?: string, newEmail?: string): Promise<boolean> {
    const client = new MongoClient(uri);
    await client.connect();

    const customer = await findCustomer(email);
    if (!customer) {
        console.error(`Email ${email} is not registered yet.`);
        return false;
    }

    let updated = false;
    try {
        const newCustomer: Customer = {
            name: newName ? newName : customer.name,
            email: newEmail ? newEmail : customer.email
        }

        await client.db().collection('customers').updateOne(
            { _id: customer._id },
            { $set: newCustomer },
            { upsert: false }
        );
        console.log('Customer was updated!');
        updated = true;
    } catch (err) {
        console.log(`Unable to update customer. Err: ${err}`);
    } finally {
        await client.close();
        return updated;
    }
}

export async function removeCustomer(email: string): Promise<boolean> {
    const client = new MongoClient(uri);
    await client.connect();

    const customer = await findCustomer(email);
    if (!customer) {
        console.error(`Email ${email} is not registered yet.`);
        return false;
    }

    let removed = false;
    try {
        await client.db().collection('customers').deleteOne({ _id: customer._id });
        console.log('Customer was deleted!');

        const wishlist = await client.db().collection('wishlists').findOne({ email: email });
        if (!!wishlist) {
            await client.db().collection('wishlists').deleteOne({ _id: wishlist._id });
        }

        removed = true;
    } catch (err) {
        console.log(`Unable to delete customer. Err: ${err}`);
    } finally {
        await client.close();
        return removed;
    }
}

export async function getCustomerProductIds(email: string): Promise<string[]> {
    const client = new MongoClient(uri);
    await client.connect();

    let foundWishlist;
    try {
        foundWishlist = await client.db().collection('wishlists').findOne({ email: email });
    } catch (error) {
        console.error('No wishlist was found for this customer.');
    } finally {
        await client.close();
        const productIds = !!foundWishlist ? foundWishlist.productIds : [];
        return productIds;
    }
}

export async function addProduct(email: string, productId: string): Promise<boolean> {
    const client = new MongoClient(uri);
    await client.connect();

    const customer = await findCustomer(email);
    if (!customer) {
        console.error(`Customer is not registered yet.`);
        return false;
    }

    const wishlist = await client.db().collection('wishlists').findOne({ email: email });

    if (!!wishlist && wishlist.productIds.length > 0) {
        const existingProductId = wishlist.productIds.find(id => id == productId);

        if (!!existingProductId) {
            console.error('Product is already added to the wishlist.');
            return false;
        }
    }

    let updated = false;
    try {
        const existingProductIds = !wishlist ? [] : wishlist.productIds;
        const existingId = !wishlist ? null : wishlist._id;

        const newWishlist: Wishlist = {
            email: email,
            productIds: [ ...existingProductIds, productId ]
        }

        await client.db().collection('wishlists').updateOne(
            { _id: existingId },
            { $set: newWishlist },
            { upsert: true }
        );
        console.log('Wishlist was modified!');
        updated = true;
    } catch (err) {
        console.log(`Unable to update wishlist. Err: ${err}`);
    } finally {
        await client.close();
        return updated;
    }
}

export async function removeProduct(email: string, productId: string): Promise<boolean> {
    const client = new MongoClient(uri);
    await client.connect();

    const customer = await findCustomer(email);
    if (!customer) {
        console.error(`Customer is not registered yet.`);
        return false;
    }

    const wishlist = await client.db().collection('wishlists').findOne({ email: email });
    if (!wishlist || wishlist.productIds == 0) {
        console.error('There are no products in the wishlist.');
        return false;
    }

    let updated = false;
    try {
        const newProductIds = wishlist.productIds.filter(id => id != productId);

        const newWishlist: Wishlist = {
            email: email,
            productIds: newProductIds
        }

        await client.db().collection('wishlists').updateOne(
            { _id: wishlist._id },
            { $set: newWishlist },
            { upsert: false }
        );
        console.log('Wishlist was modified!');
        updated = true;
    } catch (err) {
        console.log(`Unable to update wishlist. Err: ${err}`);
    } finally {
        await client.close();
        return updated;
    }
}
