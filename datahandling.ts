
import { MongoClient } from 'mongodb';
import { Customer } from './types';

//FIXME: send password and user separately in email
const uri = "mongodb+srv://jessicamarcomini:5ZMN2bbQ3KNitDzx@cluster0.gzyci.mongodb.net/luizalabs?retryWrites=true&w=majority";

async function listCollections(): Promise<void> {
    const client = new MongoClient(uri);
    await client.connect();

    const colls = await client.db().listCollections().toArray();
    console.log(await colls);

    await client.close();
}

export async function addCustomer(customer: Customer): Promise<void> {
    const client = new MongoClient(uri);
    await client.connect();

    const existingCustomer = await findCustomer(customer.email);
    if (!!existingCustomer) {
        console.error(`Email ${customer.email} already exists in the database.`);
        return;
    }

    try {
        await client.db().collection('customers').insertOne(customer);
        console.log('Customer was added to the database!');
    } catch (err) {
        console.log(`Unable to add customer to the database. Err: ${err}`);
    } finally {
        await client.close();
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

export async function updateCustomer(email: string, newName?: string, newEmail?: string): Promise<boolean> {
    const client = new MongoClient(uri);
    await client.connect();

    try {
        const customer = await findCustomer(email);
        if (!customer) {
            console.error(`Email ${email} is not registered yet.`);
            return false;
        }

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
    } catch (err) {
        console.log(`Unable to update customer. Err: ${err}`);
    } finally {
        await client.close();
        return true;
    }
}

export async function removeCustomer(email: string): Promise<boolean> {
    const client = new MongoClient(uri);
    await client.connect();

    try {
        const customer = await findCustomer(email);
        if (!customer) {
            console.error(`Email ${email} is not registered yet.`);
            return false;
        }

        await client.db().collection('customers').deleteOne({ _id: customer._id });
        console.log('Customer was deleted!');
    } catch (err) {
        console.log(`Unable to delete customer. Err: ${err}`);
    } finally {
        await client.close();
        return true;
    }
}

// removeCustomer('je.marcom@gmail.com');

// updateCustomer('test@gmail.com', 'Jessica Marcomini', 'je.marcom@gmail.com');

// findCustomer('test@gmail.com');

// addCustomer({ email: 'je.marcom@gmail.com', name: 'Jessica Marcomini' });