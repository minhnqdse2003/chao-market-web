// types/tag/index.tsx
import { Tag, tagTypes } from '@/db/schema';

export type { Tag };
export type { CreateTag } from './request/create-tags';
export type TagTypes = (typeof tagTypes.enumValues)[number];
