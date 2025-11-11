'use server';
import { NewUserSettings, userSetting } from '@/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

interface SettingsPayload {
    theme: 'dark' | 'light';
    language: 'en' | 'vi' | string;
}

interface UserSettingRow {
    id: string;
    userId: string;
    settings: SettingsPayload;
    isDisclaimerAccepted: string | null;
}

/**
 * Gets the user settings, creating a default entry if none exists for the user.
 * @param userId The ID of the user.
 * @returns The current UserSettingRow.
 */
export async function getUserSettingsOrCreate(
    userId: string
): Promise<UserSettingRow> {
    try {
        const existingSetting = await db.query.userSetting.findFirst({
            where: eq(userSetting.userId, userId),
        });

        if (existingSetting) {
            return existingSetting as UserSettingRow;
        }

        const newSetting = await db
            .insert(userSetting)
            .values({
                userId: userId,
            })
            .returning();

        if (!newSetting[0]) {
            throw new Error('Failed to create default user settings.');
        }

        return newSetting[0] as UserSettingRow;
    } catch (error) {
        console.error('Error getting or creating user settings:', error);
        throw error;
    }
}

/**
 * Updates user settings or the disclaimer acceptance timestamp.
 * @param userId The ID of the user whose settings to update.
 * @param updates An object containing fields to update.
 * @returns The updated UserSettingRow or null if no rows were updated.
 */
export async function editUserSettings(payload: {
    userId: string;
    updates: {
        settings?: Partial<SettingsPayload>;
        isDisclaimerAccepted?: Date | string | null;
    };
}) {
    const { userId, updates } = payload;
    try {
        const updatePayload: Partial<NewUserSettings> = {};

        if (updates.settings) {
            updatePayload.settings = updates.settings;
        }

        if (updates.isDisclaimerAccepted !== undefined) {
            updatePayload.isDisclaimerAccepted =
                updates.isDisclaimerAccepted instanceof Date
                    ? updates.isDisclaimerAccepted.toISOString()
                    : updates.isDisclaimerAccepted;
        }

        if (Object.keys(updatePayload).length === 0) {
            console.warn('No updates provided for user settings.');
            return null;
        }

        const updatedRows = await db
            .update(userSetting)
            .set(updatePayload)
            .where(eq(userSetting.userId, userId))
            .returning();

        return updatedRows[0] as UserSettingRow | undefined;
    } catch (error) {
        console.error(`Error editing settings for user ${userId}:`, error);
        throw error;
    }
}
