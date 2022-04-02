import * as db from './database';
import { Customer } from './types';

export const authorizationToken = '9mDEfjEt';

export async function authenticateUser(email: string): Promise<Customer> {
    const activeUser = await db.findCustomer(email);
    return activeUser;
}

export function authorizeUser(token: string): boolean {
    return token === authorizationToken;
}