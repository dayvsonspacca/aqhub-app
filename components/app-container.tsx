import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import React from "react";

export default interface BreadcrumbItemProps {
    href?: string;
    label: string;
    isCurrent: boolean;
}

interface AppContainerProps {
    children: React.ReactNode;
    breadcrumbs: BreadcrumbItemProps[];
}

export function AppContainer({
    children,
    breadcrumbs
}: AppContainerProps) {
    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((item, index) => {
                                const isLast = index === breadcrumbs.length - 1;
                                const isHiddenOnMobile = index === 0 && breadcrumbs.length > 1;

                                return (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem className={isHiddenOnMobile ? "hidden md:block" : ""}>
                                            {item.isCurrent || isLast ? (
                                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink href={item.href || "#"}>
                                                    {item.label}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>

                                        {!isLast && (
                                            <BreadcrumbSeparator className={isHiddenOnMobile ? "hidden md:block" : ""} />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
            </div>
        </SidebarInset>
    );
}