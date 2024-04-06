import axios from "axios";
import React, { useEffect, useState, FC } from "react";

import { useSession } from "../auth/ctx";
import { Place } from "../model/place";
import { getServerUrl } from "../utils/conectionServer";

const useGetAllPlaces = () => {
  const { session } = useSession();
  const [places, setPlaces] = useState<Place[] | any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (session) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      };
      getPlaces(headers);
    }
  }, []);
  const getPlaces = async (headers: any) => {
    const { data }: any = await getServerUrl();
    typeof(data)
    const url = `${data}/places`;

    try {
      setLoading(true);
      const response = await axios.get(url, { headers });
      setPlaces(response.data);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };
  const refetch = () => {
    if (session) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      };
      getPlaces(headers);
    }
  }

  return { places, loading, refetch };
};
export { useGetAllPlaces };
