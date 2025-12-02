import BreadcrumbItemProps, { AppContainer } from "@/components/app-container";

const breadcrumbs: BreadcrumbItemProps[] = [
  {
    isCurrent: true,
    label: 'Home'
  }
];

export default function Home() {
  return (
    <AppContainer breadcrumbs={breadcrumbs}>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
    </AppContainer>
  );
}
