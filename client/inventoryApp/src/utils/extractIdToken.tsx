
import { jwtDecode} from 'jwt-decode';
import "core-js/stable/atob";
const extractUserIdFromToken = async (token: string) => {
  try {
    const decodedData  = jwtDecode(token);
     const {id}= decodedData.sub as any;
     
    return id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
export default extractUserIdFromToken;