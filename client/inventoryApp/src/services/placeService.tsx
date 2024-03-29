import axios from "axios";
import React, {useEffect, useState} from "react";
import {serverAdressConnection} from "./serverAdressConnection";
//get all places
const getAllPlaces = () => {
    const serverAdress = serverAdressConnection()
  const [places, setPlaces] = useState<any>();
  useEffect(() => {
    const getPlaces = async () => {
      const response = await axios.get(`${serverAdress}/places`);
      setPlaces(response.data);
    };
    getPlaces();
  }, []);
  return places;
};
export {getAllPlaces};

