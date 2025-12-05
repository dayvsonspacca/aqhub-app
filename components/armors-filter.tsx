import { useState, useEffect } from "react";
import RaritiesSelect from "@/components/rarities-select";
import TagsSelect from "@/components/tags-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemTag } from "@/src/interfaces/core";
import { ArmorFilter } from "@/src/interfaces/armor";

type AppliedFilter = Omit<ArmorFilter, 'page' | 'page_size'>;

interface ArmorsFilterProps {
    initialFilter: ArmorFilter;
    onApplyFilter: (filter: AppliedFilter) => void;
}

export default function ArmorsFilter({ initialFilter, onApplyFilter }: ArmorsFilterProps) {
    const [nameInput, setNameInput] = useState<string>(initialFilter.name || '');
    const [tagsSelect, setTagsSelect] = useState<ItemTag[]>(initialFilter.tags || []);
    const [raritiesSelect, setRaritiesSelect] = useState<string[]>(initialFilter.rarities || []);

    useEffect(() => {
        setNameInput(initialFilter.name || '');
        setTagsSelect(initialFilter.tags || []);
        setRaritiesSelect(initialFilter.rarities || []);
    }, [initialFilter]);

    const handleSearch = () => {
        const name = nameInput.trim() === '' ? null : nameInput.trim();

        onApplyFilter({
            tags: tagsSelect.length > 0 ? tagsSelect : null,
            name,
            rarities: raritiesSelect.length > 0 ? raritiesSelect : null,
        });
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl">Armor Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div className="space-y-1 col-span-2">
                        <Label htmlFor="armor-name">Armor Name</Label>
                        <Input
                            id="armor-name"
                            placeholder='Enter name...'
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <Label>Rarities</Label>
                        <RaritiesSelect 
                            onRaritiesChange={setRaritiesSelect} 
                            disabled={false} 
                            initialRarities={initialFilter.rarities} 
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Tags</Label>
                        <TagsSelect 
                            onTagsChange={setTagsSelect} 
                            disabled={false} 
                            initialTags={initialFilter.tags} 
                        />
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <Button 
                        className="cursor-pointer w-full md:w-auto" 
                        onClick={handleSearch}
                    >
                        Apply Filters
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}