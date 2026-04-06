'use client';

import React, { useState, useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Loader2, Plus, Sparkles, X } from 'lucide-react';
import { currentUser } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { handleGetProfileRecommendations } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  age: z.number().min(18, 'You must be at least 18.'),
  bio: z.string().max(500, 'Bio must be 500 characters or less.').min(10, "Bio must be at least 10 characters."),
  interests: z.array(z.string()).max(5, 'You can add up to 5 interests.'),
});

export default function ProfileForm() {
  const [interests, setInterests] = useState(currentUser.interests);
  const [interestInput, setInterestInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [recommendations, setRecommendations] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser.name,
      age: currentUser.age,
      bio: currentUser.bio,
      interests: currentUser.interests,
    },
  });

  const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && interestInput.trim() !== '') {
      e.preventDefault();
      if (interests.length < 5) {
        const newInterests = [...interests, interestInput.trim()];
        setInterests(newInterests);
        form.setValue('interests', newInterests);
        setInterestInput('');
      }
    }
  };
  
  const removeInterest = (interestToRemove: string) => {
    const newInterests = interests.filter(interest => interest !== interestToRemove);
    setInterests(newInterests);
    form.setValue('interests', newInterests);
  };

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log(values);
    toast({
      title: "Profile Saved!",
      description: "Your changes have been successfully saved.",
    });
  };
  
  const getRecommendations = () => {
    const currentBio = form.getValues('bio');
    startTransition(async () => {
        const result = await handleGetProfileRecommendations(currentBio);
        if (result.success) {
            setRecommendations(result.recommendations);
            setIsDialogOpen(true);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.recommendations,
            });
        }
    });
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg animation-scale-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl">Edit Your Profile</CardTitle>
          <Button variant="ghost" onClick={getRecommendations} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-primary" />}
            Get AI Tips
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentUser.gallery.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <Image src={photo.imageUrl} alt={`Gallery photo ${index+1}`} fill className="object-cover" data-ai-hint={photo.imageHint} />
                         <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button type="button" variant="outline" size="sm">Change</Button>
                        </div>
                    </div>
                ))}
                 <div className="relative aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center group hover:border-primary transition-colors">
                    <Button type="button" variant="ghost" size="icon" className="h-16 w-16 text-muted-foreground group-hover:text-primary">
                        <Plus className="h-8 w-8"/>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Your Age" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself..." rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Interests</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {interests.map(interest => (
                  <Badge key={interest} variant="secondary" className="text-sm py-1 pl-3 pr-2">
                    {interest}
                    <button type="button" onClick={() => removeInterest(interest)} className="ml-2 rounded-full hover:bg-black/10 p-0.5">
                        <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormControl>
                <Input
                  placeholder="Type an interest and press Enter"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={handleInterestKeyDown}
                  disabled={interests.length >= 5}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.interests?.message}</FormMessage>
            </FormItem>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary"/>
                    AI Profile Recommendations
                </DialogTitle>
                <DialogDescription>
                    Here are some suggestions to make your profile stand out.
                </DialogDescription>
            </DialogHeader>
            <div className="prose prose-sm prose-p:text-foreground text-sm max-h-[60vh] overflow-y-auto pr-2">
                {recommendations.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
            <Button onClick={() => setIsDialogOpen(false)}>Got it, thanks!</Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
