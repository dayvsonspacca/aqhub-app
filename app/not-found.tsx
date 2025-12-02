import BreadcrumbItemProps, { AppContainer } from "@/components/app-container";
import { ArrowUpRightIcon, FileWarning, Github } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button"

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

const breadcrumbs: BreadcrumbItemProps[] = [];

export default function NotFound() {
    return (
        <AppContainer breadcrumbs={breadcrumbs}>
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <FileWarning />
                    </EmptyMedia>
                    <EmptyTitle>Page not Found</EmptyTitle>
                    <EmptyDescription>
                        The page you are looking for was not found.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-2">
                        <Link target="_blank" href="https://github.com/dayvsonspacca/aqhub-app">
                            <Button className="cursor-pointer"><Github /> Github</Button>
                        </Link>
                        <Link href="/">
                            <Button className="cursor-pointer" variant="link">Home <ArrowUpRightIcon /></Button>
                        </Link>
                    </div>
                </EmptyContent>
            </Empty>
        </AppContainer>
    );
}
