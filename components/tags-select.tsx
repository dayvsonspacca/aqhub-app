'use client';

import { MultiSelect } from "@/components/ui/multi-select";

interface Option {
    value: string;
    label: string;
}

interface TagsSelectProps {
    onTagsChange: (tags: string[]) => void;
}

const tags: Option[] = [
    {value: 'legend', label: 'Legend'},
    {value: 'ac', label: 'Adventure Coins'},
    {value: 'rare', label: 'Rare'},
    {value: 'pseudo rare', label: 'Pseudo Rare'},
    {value: 'seasonal', label: 'Seasonal'},
    {value: 'special offer', label: 'Special Offer'}
];

export default function TagsSelect({ onTagsChange }: TagsSelectProps) {
    return (
        <MultiSelect
            options={tags}
            onValueChange={onTagsChange}
            placeholder="Choose tags..."
        />
    );
}