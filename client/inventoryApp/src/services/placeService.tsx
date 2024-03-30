import axios from "axios";
import React, { useEffect, useState, FC } from "react";
import { serverAdressConnection } from "./serverAdressConnection";
import { useSession } from "../auth/ctx";
import { Place } from "../model/place";
//get all places
type PropsGetAllPlaces = {
  token: string | undefined;
};
const useGetAllPlaces = () => {
  const { session } = useSession();

  const serverAdress = serverAdressConnection();
  const [places, setPlaces] = useState<Place[] | any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (session ) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      };
      getPlaces(headers);
    }
  }, [session]);
  const getPlaces = async (headers: any) => {
    try {
      const url = `${serverAdress}/places`;
      setLoading(true);
      const response = await axios.get(url, { headers });
      setPlaces(response.data);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { places, loading };
};
export { useGetAllPlaces };
