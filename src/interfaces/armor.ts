import { ItemTag } from "@/src/interfaces/core";

export interface Armor {
    id: string;
    name: string;
    description: string;
    registered_at: string,
    rarity: string|null,
    tags: Array<ItemTag>
}

export interface ArmorFilter {
    name: string|null;
    page: number;
    page_size: number;
    rarities: null|string[];
    tags: null|Array<ItemTag>;
}

export interface ListArmorsResponse {
    filter: ArmorFilter,
    armors: Armor[],
    total: number
}