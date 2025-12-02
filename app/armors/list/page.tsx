'use client';

import BreadcrumbItemProps, { AppContainer } from "@/components/app-container";
import { ArmorCard } from "@/components/armor-card";
import TagsSelect from "@/components/tags-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { ArmorFilter } from "@/src/interfaces/armor";
import Api from "@/src/server/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItemProps[] = [
    {
        isCurrent: false,
        label: 'Armors'
    },
    {
        isCurrent: true,
        label: 'List'
    }
];

const apiInstance = new Api();

const initialFilter: ArmorFilter = {
    page: 1,
    page_size: 20,
    name: null,
    rarities: null,
    tags: null
};

const tags = [
    {value: 'legend', label: 'Legend'},
    {value: 'ac', label: 'Adventure Coins'},
    {value: 'rare', label: 'Rare'},
    {value: 'pseudo rare', label: 'Pseudo Rare'},
    {value: 'seasonal', label: 'Seasonal'},
    {value: 'special offer', label: 'Special Offer'}
];

export default function Page() {
    const [filter, setFilter] = useState<ArmorFilter>(initialFilter);
    const [nameInput, setNameInput] = useState<string>(filter.name || '');
    const [tagsSelect, setTagsSelect] = useState<string[]>([]);

    const handleSearch = () => {
        const newName = nameInput.trim() || null;

        setFilter(prevFilter => ({
        ...prevFilter,
            tags: tagsSelect,
            name: newName,
            page: 1
        }));
    };

    const query = useQuery({
        queryKey: ['armors', filter],
        queryFn: () => apiInstance.getArmors(filter),
        placeholderData: (previousData) => previousData
    })

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <AppContainer breadcrumbs={breadcrumbs}>
            <div className='w-full space-y-2'>
                <TagsSelect onTagsChange={setTagsSelect} />
                <div className='flex gap-2'>
                    <Input
                        placeholder='Armor name'
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onKeyDown={handleKeyDown as any}
                        disabled={query.isFetching}
                    />
                    <Button onClick={handleSearch} disabled={query.isFetching}>
                        {query.isFetching ? <Loader className="animate-spin" /> : 'Search'}
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {query.data?.armors.map(armor => (
                    <ArmorCard key={armor.id} armor={armor} />
                ))}
            </div>
        </AppContainer >
    );
}