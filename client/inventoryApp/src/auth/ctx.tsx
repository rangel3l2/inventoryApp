import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useStorageState } from "./expo-secure-storage";
import { useRouter } from "expo-router";
import { Session } from "../model/Session";
import { ServerUrlResponse, getServerUrl } from "../utils/conectionServer";

const AuthContext = React.createContext<{
  signIn: (
    barcode: string
  ) => Promise<{ success: boolean; name?: any; error?: string } | any>;
  signOut: () => void;
  session?: null | Session;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
}>({
  signIn: () => Promise.resolve({ success: false }),
  signOut: () => null,
  session: null,
  isLoading: false,
  setSession: () => null,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const navigation = useRouter();

  async function signIn(barcode: string) {
    const response: AxiosResponse<ServerUrlResponse> = await getServerUrl();
    const { data } : string | any= response;
   
    try {
      // Tentar a autenticação com o IP atual
      const response = await axios.post(`${data}/auth`, {
        barcode,
      });

      if (response.status === 200) {
        if (response.data.success) {
          setSession(response.data);
          return { success: true, name: response.data.name };
        } else {
          return { success: false, error: "Autenticação falhou" };
        }
      }
    } catch (error) {
      console.error("Erro na autenticação com o IP", data, error);
    }
  }
  async function signOut() {
    setSession(null);
    navigation.replace("/(login)/");
  }

  return (
    <AuthContext.Provider
      value={{
        setSession,
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
