import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.adilov.foodordering",
    databaseId: "68a4286a000e6999b2f8",
    bucketId: "68a5813a00245f4cba3b",
    userCollectionId: "68a428a900367d756e00",
    categoriesCollectionId: "68a57cf4001e534fe48f",
    menuCollectionId: "68a57daf001856f4f398",
    customizationsCollectionId: "68a57efb0008d96e3159",
    menuCustomizationsCollectionId: "68a580280019d7010e8a", //appwrite da menu_customizations yozilgan

}

export const  client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export const createUser = async ({email, password, name} : CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error

        await signIn({ email, password })

        const avatarUrl = avatars.getInitialsURL(name)

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {  email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );

    } catch (e) {
        throw new Error(e as string)
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error();

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error();

        return currentUser.documents[0]
    } catch (e) {
        console.log(e)
        throw new Error(e as string)
    }
}