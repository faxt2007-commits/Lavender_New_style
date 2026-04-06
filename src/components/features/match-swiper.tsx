'use client';

import * as React from 'react';
import Image from 'next/image';
import { Heart, Info, MapPin, X } from 'lucide-react';
import { users } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '../ui/badge';

export default function MatchSwiper() {
  const potentialMatches = users;

  return (
    <div className="w-full max-w-sm animation-scale-in">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {potentialMatches.map((user) => (
            <CarouselItem key={user.id}>
              <Card className="overflow-hidden shadow-2xl rounded-2xl border-2 border-transparent hover:border-primary transition-colors duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={user.image.imageUrl}
                      alt={user.name}
                      fill
                      className="object-cover"
                      data-ai-hint={user.image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-3xl font-bold">
                        {user.name}, {user.age}
                      </h3>
                      <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full">
                        <Info className="w-5 h-5"/>
                        <span className="sr-only">More info</span>
                    </Button>
                  </div>
                  <div className="p-6 bg-card">
                    <p className="text-muted-foreground text-sm">{user.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {user.interests.slice(0,4).map(interest => (
                            <Badge key={interest} variant="secondary" className="font-normal">{interest}</Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex justify-center gap-6 items-center">
            <CarouselPrevious>
                <Button variant="outline" size="icon" className="w-20 h-20 rounded-full border-4 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-300 transform hover:scale-110">
                    <X className="w-8 h-8" />
                </Button>
            </CarouselPrevious>
            <CarouselNext>
                <Button variant="outline" size="icon" className="w-24 h-24 rounded-full border-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 transform hover:scale-110">
                    <Heart className="w-10 h-10" />
                </Button>
            </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
}
