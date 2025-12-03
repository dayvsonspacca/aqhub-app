export interface Armor {
    id: string;
    name: string;
    description: string;
    registered_at: Date,
    rarity: string|null,
    tags: Array<'Legend' | 'Adventure Coins' | 'Rare' | 'Pseudo Rare' | 'Seasonal' | 'Special Offer'>
}

export interface ArmorFilter {
    name: string|null;
    page: number;
    page_size: number;
    rarities: null|string[];
    tags: null|Array<'Legend' | 'Adventure Coins' | 'Rare' | 'Pseudo Rare' | 'Seasonal' | 'Special Offer'>;
}