import React, { useState, createContext, ReactNode, useEffect } from "react";
import { router } from "expo-router";
import api from '../services/api';
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
    user: UserProps;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}
type SignUpProps = {
    name: string;
    email: string;
    date: Date;
    gender: string;
    document: string;
    university: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | undefined>()

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        async function getUser() {
            const userInfo = await AsyncStorage.getItem('@userAutor');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Beare ${hasUser.token}`
                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                });
            }
            setLoading(false);
        }

        getUser();

    }, [])

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/sessions', {
                email,
                password
            }, { validateStatus: () => true })

            const { id, name, token } = response.data;
            const data = {
                ...response.data
            }

            if (response.status === 200 || response.status === 201) {

                await AsyncStorage.setItem('@userAutor', JSON.stringify(data))

                api.defaults.headers.common['Authorization'] = `Beare ${token}`

                router.replace('/')
                setUser({ id, name, email, token });


            } else if (response.status === 400) {
                Alert.alert('Atenção', 'Verifique se seu e-mail ou senha estão corretos.');
            } else {
                throw new Error()
            }

            setLoadingAuth(false);

        } catch (err) {

            Alert.alert('Atenção', 'Falha no sistema! Tente novamente.');

            setLoadingAuth(false);
        }
    }

    async function signUp(data: SignUpProps) {

        try {
            const response = await api.post('/user', {
                name: data.name,
                email: data.email,
                date_of_birth: data.date,
                gender: data.gender,
                document: data.document,
                university: data.university,
                password: data.password
            }, { validateStatus: () => true })

            if (response.status === 200 || response.status === 201) {

                router.replace('/sign-in');

            } else if (response.status === 409) {
                Alert.alert('Atenção', 'Email já cadastrado! Faça login para continuar.');
            } else {
                throw new Error()
            }

            setLoadingAuth(false);

        } catch (err) {

            Alert.alert('Atenção', 'Falha no sistema! Tente novamente.');

            setLoadingAuth(false);
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser(null)
            })
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}