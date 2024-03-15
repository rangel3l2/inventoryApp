import axios,{AxiosResponse} from 'axios';

interface ServerUrlResponse {
    data: string; 
    success: boolean;
}
export const getServerUrl = async (): Promise<any> => {
    try {
        const response = await axios.get<ServerUrlResponse>('https://pastebin.com/raw/EdBLxG4p');
        if (response.status !== 200) {
            throw new Error('Erro ao buscar os IPs'); // Use a more descriptive error message
        }
        return response.data.data; // Extract and return the list of URLs
    } catch (error) {
        console.error('Erro ao buscar os IPs:', error);
        throw new Error('Failed to retrieve server URLs'); // Throw a more specific error
    }
};
