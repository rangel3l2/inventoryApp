import { StyleSheet, Text, View } from 'react-native'
import React,{FC,useState,useEffect} from 'react'
import axios from 'axios'
import { useSession } from '../auth/ctx'
import { Patrimony } from '../model/patrimony'
import { getServerUrl } from '../utils/conectionServer'

const getPatrimonyById = () => {
    const { session } = useSession();
    const [patrimony, setPatrimony] = useState<Patrimony | any>();
    const [barcode, setBarcode] = useState<string>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      if (session) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        };
        if(barcode){
            getPatrimony(headers);
        }
      }
    }, []);
    const getPatrimony = async (headers: any) => {
      const { data }: any = await getServerUrl();
      typeof(data)
      const url = `${data}/patrimony/${barcode}`;
        console.log(url)
      try {
        setLoading(true);
        const response = await axios.get(url, { headers });
        setPatrimony(response.data);
      } catch (error) {
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    };
 return { patrimony, loading, getPatrimony, setBarcode };
}

export {getPatrimonyById}

const insertPatrimony = () => {
    const { session } = useSession();
    const [patrimony, setPatrimony] = useState<Patrimony | any>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      if (session) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        };
        insertPatrimony(headers);
      }
    }, []);
    const insertPatrimony = async (headers: any) => {
      const { data }: any = await getServerUrl();
      typeof(data)
      const url = `${data}/patrimony`;
  
      try {
        setLoading(true);
        const response = await axios.post(url, { headers });
        setPatrimony(response.data);
      } catch (error) {
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    };
 return { patrimony, loading };
 
}

export  {insertPatrimony}


const updatePatrimony = (barcode : string) => {
    const { session } = useSession();
    const [patrimony, setPatrimony] = useState<Patrimony | any>();
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
      if (session) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        };
        updatePatrimony(headers);
      }
    }, []);
    const updatePatrimony = async (headers: any) => {
      const { data }: any = await getServerUrl();
      typeof(data)
      const url = `${data}/patrimony`;
  
      try {
        setLoading(true);
        const response = await axios.put(url, { headers });
        setPatrimony(response.data);
      } catch (error) {
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    };
 return { patrimony, loading };
 
}

export {updatePatrimony}

