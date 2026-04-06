'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { Send, Sparkles } from 'lucide-react';
import { conversations, currentUser, getUserById, type Conversation, type User } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { handleGenerateIcebreaker } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

export default function ChatInterface() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(conversations[0]?.id || null);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);
  const match = selectedConversation ? getUserById(selectedConversation.userId) : null;
  
  const generateIcebreaker = () => {
    if (!match) return;
    
    startTransition(async () => {
      const result = await handleGenerateIcebreaker(currentUser.bio, match.bio);
      if (result.success) {
        setMessage(result.message);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
    });
  };

  return (
    <div className="flex h-full border-t">
      <aside className="w-1/3 border-r h-full overflow-y-auto">
        <ScrollArea className="h-full">
          {conversations.map(convo => {
            const user = getUserById(convo.userId);
            if (!user) return null;
            return (
              <button
                key={convo.id}
                className={cn(
                  'flex w-full items-center gap-3 p-4 text-left hover:bg-accent transition-colors',
                  selectedConversationId === convo.id && 'bg-accent'
                )}
                onClick={() => setSelectedConversationId(convo.id)}
              >
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={user.image.imageUrl} alt={user.name} data-ai-hint={user.image.imageHint}/>
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{convo.messages[convo.messages.length - 1].text}</p>
                </div>
              </button>
            );
          })}
        </ScrollArea>
      </aside>
      <main className="flex w-2/3 flex-col h-full">
        {selectedConversation && match ? (
          <>
            <div className="flex items-center gap-3 border-b p-4">
              <Avatar>
                <AvatarImage src={match.image.imageUrl} alt={match.name} data-ai-hint={match.image.imageHint}/>
                <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{match.name}</h2>
            </div>
            <ScrollArea className="flex-1 p-6">
              <div className="flex flex-col gap-4">
                {selectedConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex items-end gap-2',
                      msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {msg.senderId !== currentUser.id && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={match.image.imageUrl} data-ai-hint={match.image.imageHint}/>
                        <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-xs rounded-2xl p-3 text-sm lg:max-w-md',
                        msg.senderId === currentUser.id
                          ? 'rounded-br-none bg-primary text-primary-foreground'
                          : 'rounded-bl-none bg-card'
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4 flex flex-col gap-2">
                <Button variant="outline" size="sm" className="w-fit self-start gap-2" onClick={generateIcebreaker} disabled={isPending}>
                    <Sparkles className="w-4 h-4 text-primary" />
                    {isPending ? 'Generating...' : 'AI Icebreaker'}
                </Button>
                <div className="relative">
                    <Input 
                        placeholder="Type a message..." 
                        className="pr-12 h-12" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9">
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
            <MessageCircle className="w-16 h-16 mb-4"/>
            <h2 className="text-xl font-semibold">Select a conversation</h2>
            <p>Start chatting with your matches!</p>
          </div>
        )}
      </main>
    </div>
  );
}
