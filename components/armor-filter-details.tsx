import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Trash2 } from "lucide-react";
import { ArmorFilter } from "@/src/interfaces/armor";

type DisplayFilter = Omit<ArmorFilter, 'page' | 'page_size'>;

interface ArmorsFilterDetailsProps {
    currentFilter: DisplayFilter;
    onClearFilter: () => void;
}

export default function ArmorsFilterDetails({ currentFilter, onClearFilter }: ArmorsFilterDetailsProps) {
    const isFilterApplied = () => {
        return (
            currentFilter.name !== null ||
            (currentFilter.rarities && currentFilter.rarities.length > 0) ||
            (currentFilter.tags && currentFilter.tags.length > 0)
        );
    };

    const applied = isFilterApplied();
    if (!applied) {
        return null;
    }

    const formatTags = (tags: typeof currentFilter.tags) => {
        if (!tags) return [];
        return tags.map(tag => tag);
    };

    const formattedRarities = currentFilter.rarities || [];
    const formattedTags = formatTags(currentFilter.tags);

    const filterItems: { label: string, values: string[] }[] = [
        { label: 'Name', values: currentFilter.name ? [currentFilter.name] : [] },
        { label: 'Rarities', values: formattedRarities },
        { label: 'Tags', values: formattedTags },
    ].filter(item => item.values.length > 0);

    return (
        <Card className="w-full mb-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-medium flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    Applied Filters
                </CardTitle>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={onClearFilter}
                    className="flex items-center gap-1 cursor-pointer"
                >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {filterItems.map((group, index) => (
                        <>
                            <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                                {group.label}:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {group.values.map((value, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-sm">
                                        {value}
                                    </Badge>
                                ))}
                            </div>
                        </>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}