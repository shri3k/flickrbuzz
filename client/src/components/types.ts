import type { FeedData } from '@/types.ts';

export type PhotoCard = Omit<FeedData, 'description' | 'author_id'>;
