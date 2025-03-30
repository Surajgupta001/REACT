import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

// Appwrite service for authentication
// This service handles user authentication, including account creation, login, and session management.
// It uses the Appwrite SDK to interact with the Appwrite backend.
// The service is initialized with the Appwrite client and project ID, and provides methods for creating accounts, logging in, getting the current user, and logging out.
export class AuthService {
    client = new Client();
    account;
    
    // Constructor initializes the Appwrite client with the endpoint and project ID.
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }
    // Method to create a new user account
    // It takes an object with email, password, and name as parameters.
    async createAccount({email, password, name}) {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            // call another method
            return this.login({email, password});
        } else {
            return userAccount;
        }
    }
    // Method to login a user
    // It takes an object with email and password as parameters.
    async login({email, password}) {
        return this.account.createEmailSession(email, password);
    }
    // Method to get the current user
    // It returns the user account information.
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }
    // Method to get the current user's sessions
    // It returns the sessions associated with the user account.
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService