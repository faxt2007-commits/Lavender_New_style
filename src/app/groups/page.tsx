import AppLayout from '@/components/layout/app-layout';
import GroupsList from '@/components/features/groups-list';
import { groups } from '@/lib/data';

export default function GroupsPage() {
  return (
    <AppLayout title="Join a Group">
      <div className="p-4 sm:p-6">
        <GroupsList groups={groups} />
      </div>
    </AppLayout>
  );
}
