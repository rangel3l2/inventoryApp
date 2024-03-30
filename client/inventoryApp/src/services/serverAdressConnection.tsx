import React, { useState, useEffect } from 'react';
import axios from 'axios';

const serverAdressConnection = async () => {
  const [serverAdress, setServerAdress] = useState<string | null>(null); // Initial state: null

  useEffect(() => {
    async function fetchServerAddress() {
      try {
        const response = await axios.get('https://pastebin.com/raw/EdBLxG4p');
        if (response.status == 200) {
            setServerAdress(response.data);
        }

        
      } catch (error) {
        console.error('Error fetching server address:', error);
        // Handle the error more gracefully, e.g., display an error message
      }
    }

    fetchServerAddress();
  }, []);

  // Await the response within the function

};

export { serverAdressConnection };
