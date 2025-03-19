import * as Crypto from 'expo-crypto';
import * as Linking from "expo-linking";

export const getUUIDv4 = () => Crypto.randomUUID();

export const getDate = () =>  new Date().toISOString();

export const cleanPhoneNumber = (phoneNumber:string) =>  String(Number(phoneNumber.replace(/[^a-zA-Z0-9]/g, '')));

export const sendWhatsapp = (phoneNumber: number, message: string) => {
    const text = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    Linking.openURL(url)
        .catch((e) => {
            console.error('An error occurred', e);
        });
}
