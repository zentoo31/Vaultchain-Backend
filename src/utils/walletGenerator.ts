import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { payments, networks } from 'bitcoinjs-lib';
import { randomBytes } from 'crypto';

export class WalletGenerator {
    private readonly derivationPath = "m/44'/0'/0'/0/0";
    private readonly network = networks.bitcoin;
    
    async generateWalletPerUser(): Promise<any> {
        try {
            if (!ecc) throw new Error("ECC library not initialized");
            
            const bip32 = BIP32Factory(ecc);
            const mnemonic = bip39.generateMnemonic(256, randomBytes);
            
            if (!bip39.validateMnemonic(mnemonic)) {
                throw new Error("Invalid mnemonic generated");
            }

            const seed = await bip39.mnemonicToSeed(mnemonic);
            const root = bip32.fromSeed(seed, this.network);
            const child = root.derivePath(this.derivationPath);
            
            const { address } = payments.p2pkh({
                pubkey: Buffer.from(child.publicKey),
                network: this.network
            });

            return {
                mnemonic,
                address,
                privateKey: child.toWIF(),
                publicKey: child.publicKey.toString(),
                derivationPath: this.derivationPath
            };
            
        } catch (error) {
            console.error("Wallet generation failed:", error);
            throw new Error("Failed to generate wallet");
        }
    }
}