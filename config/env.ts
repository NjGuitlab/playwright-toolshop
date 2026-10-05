import dotenv from 'dotenv';
import path from 'path';


// Charge le fichier .env (s'il existe) dans process.env
dotenv.config({path: path.resolve(__dirname, '..', '.env'), quiet:true})

// Url de l'interface
export const UI_URL = process.env.UI_URL ?? 'https://practicesoftwaretesting.com';

// Url de l'API rest
export const API_URL = process.env.API_URL ?? 'https://practicesoftwaretesting.com';

// Compte client fournit par ToolShop pour les tests
export const CUSTOMER = {
email: process.env.CUSTOMER_EMAIL ?? 'customer@practicesoftwaretesting.com',
password: process.env.CUSTOMER_PASSWORD ?? 'welcome01',
firstName: 'Jane',
lastName: 'Doe',
};

/** Fichier où le projet "setup" enregistre la session du client connecté. */
export const CUSTOMER_STATE = 'playwright/.auth/customer.json';

