import axios,{AxiosResponse} from 'axios';

export interface ServerUrlResponse {
    data: string; 
    success: boolean;
}

export const getServerUrl = async (): Promise<AxiosResponse<ServerUrlResponse>> => {
    try {
        const response = await axios.get<ServerUrlResponse>('https://pastebin.com/raw/EdBLxG4p');
        
        if (response.status !== 200) {
            throw new Error('Erro ao buscar os IPs');
        } else {
            return response;
        }
    } catch (error) {
        console.error('Erro ao buscar os IPs', error);
        throw error; // Lança o erro novamente para ser capturado pelo código que chama essa função
    }
};
