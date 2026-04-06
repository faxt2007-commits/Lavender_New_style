// use server'

/**
 * @fileOverview Generates icebreaker messages for matches using a generative AI tool.
 *
 * - generateIcebreaker - A function that generates icebreaker messages.
 * - GenerateIcebreakerInput - The input type for the generateIcebreaker function.
 * - GenerateIcebreakerOutput - The return type for the generateIcebreaker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIcebreakerInputSchema = z.object({
  userProfile: z.string().describe('The user profile description.'),
  matchProfile: z.string().describe('The matched user profile description.'),
});
export type GenerateIcebreakerInput = z.infer<typeof GenerateIcebreakerInputSchema>;

const GenerateIcebreakerOutputSchema = z.object({
  icebreakerMessage: z.string().describe('The generated icebreaker message.'),
});
export type GenerateIcebreakerOutput = z.infer<typeof GenerateIcebreakerOutputSchema>;

export async function generateIcebreaker(input: GenerateIcebreakerInput): Promise<GenerateIcebreakerOutput> {
  return generateIcebreakerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIcebreakerPrompt',
  input: {schema: GenerateIcebreakerInputSchema},
  output: {schema: GenerateIcebreakerOutputSchema},
  prompt: `You are a dating app assistant helping users to start conversations with their matches.

  Based on the user's profile and the match's profile, generate an icebreaker message that is engaging and relevant to both of them.

  User Profile: {{{userProfile}}}
  Match Profile: {{{matchProfile}}}

  Icebreaker Message:`, // Ensure the output is assigned to the icebreakerMessage field
});

const generateIcebreakerFlow = ai.defineFlow(
  {
    name: 'generateIcebreakerFlow',
    inputSchema: GenerateIcebreakerInputSchema,
    outputSchema: GenerateIcebreakerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
