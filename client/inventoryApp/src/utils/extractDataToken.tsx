
import { jwtDecode} from 'jwt-decode';
import "core-js/stable/atob";
const extractUserIdFromToken = async (token: string) => {
  try {
    const decodedData  = jwtDecode(token);
     const {user_id, name, role}= decodedData.sub as any;
     
    return {user_id, name, role};
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
export default extractUserIdFromToken;