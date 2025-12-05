'use client';

import BreadcrumbItemProps, { AppContainer } from "@/components/app-container";
import { ArmorCard } from "@/components/armor-card";
import { ArmorFilter } from "@/src/interfaces/armor";
import Api from "@/src/server/api";
import { useQuery } from "@tanstack/react-query";
import { Filter, Shirt } from "lucide-react";
import { useState, useCallback } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import ArmorsFilter from "@/components/armors-filter";
import { Skeleton } from "@/components/ui/skeleton";
import ArmorsFilterDetails from "@/components/armor-filter-details";

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
    const [activeTab, setActiveTab] = useState<string>("tab-1"); 

    const handleApplyFilter = useCallback((newFilter: Omit<ArmorFilter, 'page' | 'page_size'>) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            ...newFilter,
            page: 1,
        }));
        
        setActiveTab("tab-1"); 
    }, []);

    const query = useQuery({
        queryKey: ['armors', filter],
        queryFn: () => apiInstance.getArmors(filter),
        placeholderData: (previousData) => previousData
    });

    const handleClearFilter = useCallback(() => {
        setFilter(initialFilter);
        setActiveTab("tab-1");
    }, []);

    return (
        <AppContainer breadcrumbs={breadcrumbs}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <ScrollArea>
                    <TabsList className="-space-x-px mb-3 h-auto bg-background p-0 shadow-xs rtl:space-x-reverse">
                        <TabsTrigger
                            className="relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
                            value="tab-1"
                        >
                            <Shirt
                                aria-hidden="true"
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                            />
                            Armors
                        </TabsTrigger>
                        <TabsTrigger
                            className="relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
                            value="tab-2"
                        >
                            <Filter
                                aria-hidden="true"
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                            />
                            Filters
                        </TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <TabsContent value="tab-1">
                    <ArmorsFilterDetails currentFilter={filter} onClearFilter={handleClearFilter} />
                    {
                        query.isFetching ? (
                            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <Skeleton key={index} className="bg-muted aspect-video rounded-xl" />
                                ))}
                            </div >
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {query.data?.armors.map(armor => (
                                    <ArmorCard key={armor.id} armor={armor} />
                                ))}
                            </div>
                        )
                    }
                </TabsContent>
                <TabsContent value="tab-2">
                    <ArmorsFilter initialFilter={filter} onApplyFilter={handleApplyFilter} />
                </TabsContent>
            </Tabs>
        </AppContainer>
    );
}