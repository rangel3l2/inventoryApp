  import React from 'react';
  import axios from 'axios';
  import { useStorageState } from './expo-secure-storage';
  import { useRouter } from 'expo-router';
  import { Session } from '../model/Session';

  const AuthContext = React.createContext<{
    signIn: (barcode: string) => Promise<{ success: boolean; username?: string; error?: string }>;
    signOut: () => void;
    session?:  null | Session;
    isLoading: boolean;
  }>({
    signIn: () => Promise.resolve({ success: false }),
    signOut: () => null,
    session: null,
    isLoading: false,
  });

  export function useSession() {
    const value = React.useContext(AuthContext);
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
    return value;
  }

  export function SessionProvider(props: React.PropsWithChildren) { 
    const [[isLoading, session], setSession] = useStorageState('session');
    const navigation = useRouter()
    const signIn = async (barcode: string) => {   
      
      try {
        const response = await axios.post('http://192.168.1.105:5000/auth', {
          barcode,
        });

        if (response.status === 200) {
          // Se o backend retornar true, definimos a sessão com o nome de usuário
          if (response.data.success) {
            setSession(response.data);
            return { success: true, username: response.data.username };
          } else {
            return { success: false, error: 'Autenticação falhou' };
          }
        } else {
          return { success: false, error: 'Erro na requisição para autenticação' };
        }
      } catch (error) {
        console.error('Erro durante a autenticação:', error);
        return { success: false, error: 'Ocorreu um erro durante a autenticação' };
      }
    };

  async function signOut()  {  

      setSession(null);
      navigation.replace('/(login)/');
    };

    return (
      <AuthContext.Provider
        value={{
          signIn,
          signOut,
          session,
          isLoading,
        }}>
        {props.children}
      </AuthContext.Provider>
    );
  }
