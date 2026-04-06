import AppLayout from '@/components/layout/app-layout';
import ProfileForm from '@/components/features/profile-form';

export default function ProfilePage() {
  return (
    <AppLayout title="My Profile">
      <div className="p-4 sm:p-6">
        <ProfileForm />
      </div>
    </AppLayout>
  );
}
