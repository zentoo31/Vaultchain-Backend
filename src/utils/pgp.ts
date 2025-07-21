import openpgp from 'openpgp';

export class PGPUtils {
    static async generateKeyPair(email: string, passphrase: string): Promise<{ privateKey: string; publicKey: string }> {
        const { privateKey, publicKey } = await openpgp.generateKey({
            type: 'rsa',
            rsaBits: 2048,
            userIDs: [{ email }],
            passphrase,
        });
        return { privateKey, publicKey };
    }

    static async encryptMessage(publicKeyArmored: string, message: string): Promise<string> {
        const publicKey = await openpgp.readKey({armoredKey: publicKeyArmored});
        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({text: message}),
            encryptionKeys: publicKey
        });

        return encrypted;
    }

    static async decryptMessage(privateKeyArmored:string, passphrase: string, encrytedMessage: string): Promise<string>{
        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({armoredKey: privateKeyArmored}),
            passphrase
        });

        const message = await openpgp.readMessage({armoredMessage: encrytedMessage});
        const {data: decrypted} = await openpgp.decrypt({
            message,
            decryptionKeys:privateKey
        });

        return decrypted as string;
    }
}