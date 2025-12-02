'use client';

import BreadcrumbItemProps, { AppContainer } from "@/components/app-container";
import { ArmorCard } from "@/components/armor-card";
import RaritiesSelect from "@/components/rarities-select";
import TagsSelect from "@/components/tags-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArmorFilter } from "@/src/interfaces/armor";
import Api from "@/src/server/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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

export default function Page() {
    const [filter, setFilter] = useState<ArmorFilter>(initialFilter);
    const [nameInput, setNameInput] = useState<string>('');
    const [tagsSelect, setTagsSelect] = useState<string[]>([]);
    const [raritiesSelect, setRaritiesSelect] = useState<string[]>([]);

    const handleSearch = () => {
        let name = nameInput.trim() || null;
        let tags = tagsSelect;
        let rarities = raritiesSelect;

        setFilter(prevFilter => ({
            ...prevFilter,
            tags,
            name,
            rarities,
            page: 1
        }));
    };

    const query = useQuery({
        queryKey: ['armors', filter],
        queryFn: () => apiInstance.getArmors(filter),
        placeholderData: (previousData) => previousData
    })

    return (
        <AppContainer breadcrumbs={breadcrumbs}>
            <div className='space-y-2'>
                <TagsSelect onTagsChange={setTagsSelect} disabled={query.isFetching} />
                <RaritiesSelect onRaritiesChange={setRaritiesSelect} disabled={query.isFetching} />
                <div className='flex gap-2'>
                    <Input
                        placeholder='Armor name'
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        disabled={query.isFetching}
                    />
                    <Button className="cursor-pointer" onClick={handleSearch} disabled={query.isFetching}>
                        {query.isFetching ? <Loader2 className="animate-spin" /> : 'Search'}
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