import React,{useState, useEffect} from 'react';
import { useRouter } from 'expo-router';
import { AppState } from 'react-native';
import { useSession } from '@/src/auth/ctx';
const KeepSessionContext = React.createContext<{

  isForeground: boolean;
  setIsForeground:(isForeground:boolean)=>void;
  keepSession: boolean;
  setKeepSession:(keepSession:boolean)=>void;
  
}>({
    isForeground: true,
    setIsForeground:(isForeground:boolean)=>{},
    keepSession: true,
    setKeepSession:(keepSession:boolean)=>{},


});

export function useKeepSession() {
  const value = React.useContext(KeepSessionContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <KeepSessionProvider />');
  }
  return value;
}

export function KeepSessionProvider(props: React.PropsWithChildren) { 
  const {setSession} =  useSession() 
  const [isForeground, setIsForeground] = useState(AppState.currentState === 'active');
  const [keepSession, setKeepSession] = useState(false)
  const navigation = useRouter();

  useEffect(() => {
    
    const subscription = AppState.addEventListener('change', nextAppState => {
      setIsForeground(nextAppState === 'active');
      const active = nextAppState === 'active'
      
      if (!active && !keepSession) {
        console.log('Sessão expirada');
        setSession(null);
        navigation.replace('/');
      }
    });
  
    return () => subscription.remove();
  }, [keepSession]);
    
 
  return (
    <KeepSessionContext.Provider
      value={{
        isForeground,
        setIsForeground,
        keepSession,
        setKeepSession,
      }}>
      {props.children}
    </KeepSessionContext.Provider>
  );
}
