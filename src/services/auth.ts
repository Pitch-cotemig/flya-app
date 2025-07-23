// src/services/auth.ts

const BASE_URL = 'http://localhost:3000/auth';

const signup = async (nome: string, email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, password }),
    });

    const json = await res.json();
    return {
        success: res.ok,
        data: json.data || null,
        message: json.message || '',
    };
};

const login = async (email: string, password: string) => {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        let json;
        try {
            json = await res.json();
        } catch (err) {
            json = { message: 'Invalid server response' };
        }

        return {
            success: res.ok,
            data: json.data || null,
            message: json.message || '',
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            data: null,
            message: 'Something went wrong. Please try again.',
        };
    }
};

export const authService = {
    login: ({ email, password }: { email: string; password: string }) =>
        login(email, password),
    register: ({ nome = '', email, password }: { nome?: string; email: string; password: string }) =>
        signup(nome, email, password),
};

export interface User {
    id: string;
    nome: string;
    email: string;
}
