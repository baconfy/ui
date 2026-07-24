import {Head} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function DashboardPage() {
  return (
    <>
      <Head title="Welcome"/>

      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
    </>
  );
}

DashboardPage.layout = (page) => <AppLayout breadcrumbs={[{ title: 'Home' }]} children={page} />;
