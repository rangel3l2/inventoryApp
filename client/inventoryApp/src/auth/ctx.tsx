  import React from 'react';
  import axios from 'axios';
  import { useStorageState } from './expo-secure-storage';
  import { useRouter } from 'expo-router';
  import { Session } from '../model/Session';

  const AuthContext = React.createContext<{
    signIn: (barcode: string) => Promise<{ success: boolean; name?: string; error?: string }>;
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
      
      
    async function signIn(barcode: string) {
      try {
          // Obter a lista de IPs do Pastebin
          const response = await axios.get('https://pastebin.com/raw/EdBLxG4p');
  
          if (response.status !== 200) {
              throw new Error('Erro ao buscar os IPs');
          }
  
          const ipList = response.data.trim().split(','); // Remover espaços e dividir por vírgula
          let response2;
  
          for (const ip of ipList) {
              try {
                  // Tentar a autenticação com o IP atual
                  response2 = await axios.post(`${ip.trim()}/auth`, {
                      barcode,
                  });
  
                  if (response2.status === 200) {
                      if (response2.data.success) {
                          setSession(response2.data);
                          return { success: true, name: response2.data.name };
                      } else {
                          return { success: false, error: 'Autenticação falhou' };
                      }
                  }
              } catch (error) {
                  console.error('Erro na autenticação com o IP', ip, error);
              }
          }
  
          return { success: false, error: 'Autenticação falhou em todos os IPs' };
      } catch (error) {
          console.error('Erro durante a autenticação:', error);
          return { success: false, error: 'Ocorreu um erro durante a autenticação' };
      }
  }
  

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
