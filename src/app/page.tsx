import AppLayout from '@/components/layout/app-layout';
import MatchSwiper from '@/components/features/match-swiper';

export default function Home() {
  return (
    <AppLayout title="Find Your Spark">
      <div className="flex flex-col items-center justify-center h-full p-4 md:p-8">
        <MatchSwiper />
      </div>
    </AppLayout>
  );
}
