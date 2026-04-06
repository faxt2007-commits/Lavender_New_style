// src/ai/flows/profile-recommendations.ts
'use server';

/**
 * @fileOverview Profile recommendations AI agent.
 *
 * - getProfileRecommendations - A function that generates profile recommendations.
 * - ProfileRecommendationsInput - The input type for the getProfileRecommendations function.
 * - ProfileRecommendationsOutput - The return type for the getProfileRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileRecommendationsInputSchema = z.object({
  profileText: z
    .string()
    .describe('The text content of the user profile to analyze.'),
});

export type ProfileRecommendationsInput = z.infer<
  typeof ProfileRecommendationsInputSchema
>;

const ProfileRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of recommendations for improving the user profile to attract more matches.'
    ),
});

export type ProfileRecommendationsOutput = z.infer<
  typeof ProfileRecommendationsOutputSchema
>;

export async function getProfileRecommendations(
  input: ProfileRecommendationsInput
): Promise<ProfileRecommendationsOutput> {
  return profileRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'profileRecommendationsPrompt',
  input: {schema: ProfileRecommendationsInputSchema},
  output: {schema: ProfileRecommendationsOutputSchema},
  prompt: `You are a dating coach expert. Analyze the following dating profile and provide specific, actionable recommendations to improve it. Focus on suggesting concrete details, hobbies, experiences, or photos that the user could add to make their profile more appealing and increase their chances of finding compatible partners. Make your advice as specific and engaging as possible.\n\nProfile: {{{profileText}}}`,
});

const profileRecommendationsFlow = ai.defineFlow(
  {
    name: 'profileRecommendationsFlow',
    inputSchema: ProfileRecommendationsInputSchema,
    outputSchema: ProfileRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
