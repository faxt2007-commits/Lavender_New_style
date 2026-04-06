import { PlaceHolderImages, type ImagePlaceholder } from "./placeholder-images";

const getImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return {
      id: "fallback",
      description: "Fallback image",
      imageUrl: "https://picsum.photos/seed/fallback/600/800",
      imageHint: "placeholder",
    };
  }
  return image;
};

export type User = {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  location: string;
  image: ImagePlaceholder;
  gallery: ImagePlaceholder[];
};

export type Group = {
  id: string;
  name: string;
  description: string;
  members: number;
  image: ImagePlaceholder;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
};

export type Conversation = {
  id: string;
  userId: string;
  messages: Message[];
};

export const currentUser: User = {
  id: 'current_user',
  name: 'Alex',
  age: 28,
  bio: 'Software developer by day, aspiring chef by night. Love exploring new restaurants, hiking on weekends, and a good cup of coffee. Looking for someone to share adventures with.',
  interests: ['Cooking', 'Hiking', 'Coffee', 'Technology', 'Travel'],
  location: 'San Francisco, CA',
  image: getImage('currentUser'),
  gallery: [getImage('user1'), getImage('user2'), getImage('user3'), getImage('user4')]
};

export const users: User[] = [
  {
    id: 'user1',
    name: 'Jessica',
    age: 26,
    bio: 'Graphic designer with a passion for art and travel. My ideal weekend involves visiting a museum or exploring a new city. Big fan of indie music and spicy food.',
    interests: ['Art', 'Travel', 'Music', 'Foodie'],
    location: 'Brooklyn, NY',
    image: getImage('user1'),
    gallery: [getImage('user1'), getImage('user5'), getImage('user6')],
  },
  {
    id: 'user2',
    name: 'Mike',
    age: 30,
    bio: 'Fitness enthusiast and dog lover. You can find me at the gym or the park with my golden retriever, Max. Looking for a partner who enjoys an active lifestyle.',
    interests: ['Fitness', 'Dogs', 'Outdoors', 'Movies'],
    location: 'Austin, TX',
    image: getImage('user2'),
    gallery: [getImage('user2'), getImage('user9')],
  },
  {
    id: 'user3',
    name: 'Sarah',
    age: 29,
    bio: 'Bookworm and coffee addict. I love cozy nights in with a good book, but I\'m also up for a spontaneous road trip. Let\'s trade book recommendations!',
    interests: ['Reading', 'Coffee', 'Road Trips', 'Photography'],
    location: 'Portland, OR',
    image: getImage('user3'),
    gallery: [getImage('user3'), getImage('user5')],
  },
  {
    id: 'user4',
    name: 'David',
    age: 32,
    bio: 'Musician and aspiring songwriter. I play guitar and piano. Love live music and discovering new bands. Looking for someone who shares my passion for music.',
    interests: ['Music', 'Concerts', 'Guitar', 'Songwriting'],
    location: 'Nashville, TN',
    image: getImage('user4'),
    gallery: [getImage('user4'), getImage('user3')],
  },
  {
    id: 'user5',
    name: 'Emily',
    age: 27,
    bio: 'I\'m a chef who loves experimenting with new recipes. When I\'m not in the kitchen, I enjoy gardening and practicing yoga. Looking for someone to share delicious meals with.',
    interests: ['Cooking', 'Gardening', 'Yoga', 'Wine'],
    location: 'Chicago, IL',
    image: getImage('user5'),
    gallery: [getImage('user5'), getImage('user8'), getImage('user7')],
  },
  {
    id: 'user6',
    name: 'Chris',
    age: 28,
    bio: 'Tech entrepreneur and avid traveler. I\'ve been to over 20 countries and I\'m always planning my next adventure. Seeking a fellow explorer to see the world with.',
    interests: ['Travel', 'Startups', 'Hiking', 'Photography'],
    location: 'Seattle, WA',
    image: getImage('user6'),
    gallery: [getImage('user6'), getImage('user10')],
  },
  {
    id: 'user7',
    name: 'Laura',
    age: 25,
    bio: 'Animal lover and vet tech. I have two cats and a dog. My weekends are spent volunteering at the local animal shelter or hiking with my pup. Must love animals!',
    interests: ['Animals', 'Hiking', 'Volunteering', 'Netflix'],
    location: 'Denver, CO',
    image: getImage('user7'),
    gallery: [getImage('user7'), getImage('user9')],
  },
  {
    id: 'user8',
    name: 'James',
    age: 31,
    bio: 'Architect with an eye for design. I enjoy visiting art galleries, trying new craft beers, and cycling around the city. Looking for a creative and curious partner.',
    interests: ['Architecture', 'Design', 'Craft Beer', 'Cycling'],
    location: 'Los Angeles, CA',
    image: getImage('user8'),
    gallery: [getImage('user8'), getImage('user1')],
  },
];

export const groups: Group[] = [
  {
    id: 'group1',
    name: 'Weekend Hikers',
    description: 'For those who love to escape the city and hit the trails on the weekend. All skill levels welcome!',
    members: 124,
    image: getImage('group1'),
  },
  {
    id: 'group2',
    name: 'Book Club & Coffee Crew',
    description: 'Join us for monthly book discussions at cozy coffee shops around the city. Fiction, non-fiction, we read it all!',
    members: 88,
    image: getImage('group2'),
  },
  {
    id: 'group3',
    name: 'Foodie Adventures',
    description: 'Exploring the city one restaurant, food truck, and farmers market at a time. Come hungry!',
    members: 231,
    image: getImage('group3'),
  },
  {
    id: 'group4',
    name: 'Board Game Enthusiasts',
    description: 'From Catan to Wingspan, if you love board games, this is your group. We host weekly game nights.',
    members: 56,
    image: getImage('group4'),
  },
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    userId: 'user1',
    messages: [
      { id: 'm1', senderId: 'user1', text: 'Hey! I saw you\'re into art and travel too. Any favorite museums you\'ve visited recently?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
      { id: 'm2', senderId: 'current_user', text: 'Hi Jessica! I just went to the new exhibition at SFMOMA, it was amazing. You?', timestamp: new Date(Date.now() - 1000 * 60 * 55 * 24) },
    ]
  },
  {
    id: 'conv2',
    userId: 'user2',
    messages: [
      { id: 'm3', senderId: 'user2', text: 'Your golden retriever is so cute! What\'s his name?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) },
    ]
  },
  {
    id: 'conv3',
    userId: 'user4',
    messages: [
       { id: 'm4', senderId: 'current_user', text: 'Hey David, I\'m a big music fan too! What kind of stuff do you play on guitar?', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    ]
  },
];

// Helper to get user by ID
export const getUserById = (id: string) => users.find(u => u.id === id);
