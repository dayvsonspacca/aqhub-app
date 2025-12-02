import axios, { AxiosResponse } from 'axios';
import { Armor, ArmorFilter } from "@/src/interfaces/armor";

const api = axios.create({
    baseURL: 'https://aqhub-api.dayvsonspacca.com'
});

export default class Api {
    async getArmors(filter: ArmorFilter): Promise<{
        filter: ArmorFilter,
        armors: Armor[]
    }> {
        const params: any = {
            page: filter.page,
            page_size: filter.page_size,
        };

        if (filter.name) {
            params.name = filter.name;
        }

        if (filter.rarities && filter.rarities.length > 0) {
            params.rarities = filter.rarities.join(',');
        }

        if (filter.tags && filter.tags.length > 0) {
            params.tags = filter.tags.join(',');
        }

        const response: AxiosResponse<{ filter: ArmorFilter, armors: Armor[] }> =
            await api.get('/armors/list', { params });

        return response.data;
    };
}