'use client';

import { MultiSelect } from "@/components/ui/multi-select";
import { ItemTag } from "@/src/interfaces/core";

interface Option {
    value: string;
    label: string;
}

interface TagsSelectProps {
    onTagsChange: (tags: ItemTag[]) => void;
    disabled: boolean;
    initialTags?: ItemTag[] | null; 
}

const tags: Option[] = [
    {value: 'legend', label: 'Legend'},
    {value: 'ac', label: 'Adventure Coins'},
    {value: 'rare', label: 'Rare'},
    {value: 'pseudo rare', label: 'Pseudo Rare'},
    {value: 'seasonal', label: 'Seasonal'},
    {value: 'special offer', label: 'Special Offer'}
];

export default function TagsSelect({ onTagsChange, disabled, initialTags }: TagsSelectProps) {
    const handleValueChange = (selectedValues: string[]) => {
        onTagsChange(selectedValues as ItemTag[]); 
    };
    
    const selectedValues = initialTags?.map(tag => tag) || [];

    return (
        <MultiSelect
            options={tags}
            onValueChange={handleValueChange}
            placeholder="Choose tags..."
            disabled={disabled}
            defaultValue={selectedValues}
        />
    );
}