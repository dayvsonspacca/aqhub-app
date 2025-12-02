export interface Armor {
    id: string;
    name: string;
    description: string;
    registered_at: Date,
    rarity: string|null,
    tags: string[]
}

export interface ArmorFilter {
    name: string|null;
    page: number;
    page_size: number;
    rarities: null|string[];
    tags: null|string[];
}