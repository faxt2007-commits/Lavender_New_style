import AppLayout from '@/components/layout/app-layout';
import ChatInterface from '@/components/features/chat-interface';

export default function MessagesPage() {
  return (
    <AppLayout title="Messages">
      <div className="h-[calc(100vh-4rem)]">
        <ChatInterface />
      </div>
    </AppLayout>
  );
}
