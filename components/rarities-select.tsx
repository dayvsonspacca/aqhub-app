'use client';

import { MultiSelect } from "@/components/ui/multi-select";

interface Option {
    value: string;
    label: string;
}

interface RaritiesSelectProps {
    onRaritiesChange: (rarities: string[]) => void;
    disabled: boolean;
    initialRarities?: string[] | null; 
}

const rarities: Option[] = [
    {value: 'weird', label: 'Weird'},
    {value: 'rare', label: 'Rare'},
    {value: 'epic', label: 'Epic'},
    {value: 'legendary', label: 'Legendary'},
    {value: 'awesome', label: 'Awesome'},
    {value: 'seasonal', label: 'Seasonal'},
    {value: 'artifact', label: 'Artifact'},
    {value: 'boss drop', label: 'Boss Drop'},
    {value: 'impossible', label: 'Impossible'},
    {value: '1% drop', label: '1% drop'},
    {value: 'unknown', label: 'Unknown'},
    {value: 'secret', label: 'Secret'},
];

export default function RaritiesSelect({ onRaritiesChange, disabled, initialRarities }: RaritiesSelectProps) {
    
    const selectedValues = initialRarities || [];
    
    return (
        <MultiSelect
            options={rarities}
            onValueChange={onRaritiesChange}
            placeholder="Choose rarities..."
            disabled={disabled}
            defaultValue={selectedValues}
        />
    );
}