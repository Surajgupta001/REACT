import conf from '../conf.js';

import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if(userAccount){
                // call another method to set the user session
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        }
        catch (error) {
            throw new Error(`Error creating account: ${error.message}`);
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
           throw new Error(`Error logging in: ${error.message}`); 
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            throw new Error(`Error getting current user: ${error.message}`);
        }

        // return null;
    }
    
    async logout() {
        try {
            return await this.account.deleteSessions();
        }
        catch (error) {
            throw new Error(`Error logging out: ${error.message}`);
        }
    }
}

const authService = new AuthService();

export default authService;