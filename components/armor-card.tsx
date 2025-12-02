import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card';
import { Armor } from '@/src/interfaces/armor';

export function ArmorCard({ armor }: { armor: Armor }) {
    return (
        <div className='relative rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg'>
            <div className='flex h-60 items-center justify-center'>
                <img
                    src='https://cdn.shadcnstudio.com/ss-assets/components/card/image-11.png?width=300&format=auto'
                    alt='Shoes'
                    className='w-75'
                />
            </div>
            {armor.rarity
                ? <Badge variant="default" className="absolute top-0 right-0 mr-4 mt-4">{armor.rarity}</Badge>
                : null
            }
            <Card className='border-none'>
                <CardHeader>
                    <CardTitle>{armor.name}</CardTitle>
                    <CardDescription className='flex items-center gap-2'>
                        {armor.tags.map(tag => (
                            <Badge key={tag} variant='outline' className='rounded-sm'>
                                {tag}
                            </Badge>
                        ))}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {armor.description}
                </CardContent>
                <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
                </CardFooter>
            </Card>
        </div>
    );
}