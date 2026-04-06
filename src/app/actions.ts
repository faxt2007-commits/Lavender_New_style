'use server';

import { generateIcebreaker } from '@/ai/flows/ai-powered-icebreaker-generator';
import { getProfileRecommendations } from '@/ai/flows/profile-recommendations';

export async function handleGenerateIcebreaker(
  userProfile: string,
  matchProfile: string
) {
  try {
    const result = await generateIcebreaker({ userProfile, matchProfile });
    return { success: true, message: result.icebreakerMessage };
  } catch (error) {
    console.error('Error generating icebreaker:', error);
    return { success: false, message: 'Failed to generate icebreaker. Please try again.' };
  }
}

export async function handleGetProfileRecommendations(profileText: string) {
  try {
    const result = await getProfileRecommendations({ profileText });
    return { success: true, recommendations: result.recommendations };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return { success: false, recommendations: 'Failed to get recommendations. Please try again.' };
  }
}
