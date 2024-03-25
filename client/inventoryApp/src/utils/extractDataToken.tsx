
import { jwtDecode} from 'jwt-decode';
import "core-js/stable/atob";
const extractUserIdFromToken = async (token: string) => {
  try {
    const decodedData  = jwtDecode(token);
     const {id, name, role}= decodedData.sub as any;
     const user_id = parseInt(id);
    return {user_id, name, role};
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
export default extractUserIdFromToken;