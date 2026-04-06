import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type Group } from '@/lib/data';
import { Users } from 'lucide-react';

type GroupsListProps = {
  groups: Group[];
};

export default function GroupsList({ groups }: GroupsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group, index) => (
        <Card key={group.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 animation-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="p-0">
            <div className="relative h-40 w-full">
              <Image
                src={group.image.imageUrl}
                alt={group.name}
                fill
                className="object-cover"
                data-ai-hint={group.image.imageHint}
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-xl font-bold mb-2">{group.name}</CardTitle>
            <p className="text-muted-foreground text-sm min-h-[40px]">{group.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Users className="w-4 h-4"/>
                <span>{group.members} members</span>
            </div>
            <Button>Join Group</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
