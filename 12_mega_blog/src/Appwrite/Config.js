import Conf from '../Conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    // Constructor to initialize the Appwrite client and set the endpoint and project ID
    // The constructor also initializes the Databases and Storage services
    constructor(){
        this.client
        .setEndpoint(Conf.appwriteUrl)
        .setProject(Conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        }
        catch(error){
            console.error("Appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        }
        catch(error){
            console.error("Appwrite service :: updatePost :: error",error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug
            );
            return true;
        }
        catch(error){
            console.error("Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug
            );
        }
        catch(error){
            console.error("Appwrite service :: getPost :: error",error);
        }
        return false;
    }

    async getPosts(){
        try{
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                [
                    Query.equal('status', 'active')
                ]
            );
        }
        catch(error){
            console.error("Appwrite service :: getPosts :: error",error);
        }
        return false;
    }

    // File upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                Conf.appwriteBucketId,
                ID.unique(),
                file
            );
        }
        catch(error){
            console.error("Appwrite service :: uploadFile :: error",error);
        }
        return false;
    }

    // File delete service
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                Conf.appwriteBucketId,
                fileId
            );
            return true;
        }
        catch(error){
            console.error("Appwrite service :: deleteFile :: error",error);
        }
        return false;
    }

    // File Preview service
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            Conf.appwriteBucketId,
            fileId,            
        )
    }
}


const service = new Service()
export default service