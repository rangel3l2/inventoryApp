import axios from "axios";
import React, { useEffect, useState, FC } from "react";

import { useSession } from "../auth/ctx";
import { Place } from "../model/place";
import { getServerUrl } from "../utils/conectionServer";

const getTextToProfileComponent = (route: string) => {
  const { session } = useSession();
  const [text, setText] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (session) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      };
      getText(headers);
    }
  }, []);
  const getText = async (headers: any) => {
    const { data }: any = await getServerUrl();
    typeof(data)
    const url = `${data}/${route}`;

    try {
      setLoading(true);
      const response = await axios.get(url, { headers });
      setText(response.data);
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
      getText(headers);
    }
  }

  return { text, loading, refetch };
};
export { getTextToProfileComponent };
