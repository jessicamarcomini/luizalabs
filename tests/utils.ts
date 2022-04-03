import * as db from '../src/database';

export const mochaUserEmail = 'mocha.user@gmail.com';

const token = `u_luizalabs:p_luizalabs`;
export const encodedToken = Buffer.from(token).toString('base64');

export const exampleProductId = '11aeb116-6113-5474-c63f-01c8fc56d1bf';

export async function asyncTimeout(duration = 20000): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, duration));
}

export async function cleanupDatabase(): Promise<void> {
    const mochaUserActive = await db.findCustomer(mochaUserEmail);
    if (mochaUserActive) {
        await db.removeCustomer(mochaUserEmail);
    }
}