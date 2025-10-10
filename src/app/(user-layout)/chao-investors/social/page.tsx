'use client';

import { AppTabs, TabItem } from '@/components/app-tabs';
import { calculateAdjustedHeight } from '@/utils/height-utils';
import { useTheme } from 'next-themes';

export default function SocialPage() {
    const height = calculateAdjustedHeight();
    const { theme } = useTheme();

    const tabsList: TabItem[] = height
        ? [
              {
                  title: 'Facebook',
                  value: `facebook`,
                  renderContent: () =>
                      Promise.resolve(
                          <iframe
                              key={theme}
                              width="100%"
                              height={height}
                              src="https://rss.app/embed/v1/wall/DbZkOiJKqySE1Yac?theme=light"
                              frameBorder="0"
                              className={'bg-transparent'}
                          ></iframe>
                      ),
              },
              {
                  title: 'Tiktok',
                  value: 'tiktok',
                  renderContent: () =>
                      Promise.resolve(
                          <iframe
                              key={theme}
                              width="100%"
                              height={height}
                              frameBorder="0"
                              className={'bg-transparent'}
                              src="https://rss.app/embed/v1/wall/et05Kyvc9Tqw33Pa"
                          ></iframe>
                      ),
              },
              {
                  title: 'Youtube',
                  value: 'youtube',
                  renderContent: () =>
                      Promise.resolve(
                          <iframe
                              key={theme}
                              width="100%"
                              height={height}
                              frameBorder="0"
                              className={'bg-transparent'}
                              src="https://rss.app/embed/v1/wall/Ji9BXyT5x5ofv96e"
                          ></iframe>
                      ),
              },
          ]
        : [];

    return (
        <div>
            <AppTabs tabsList={tabsList} size={2} />
        </div>
    );
}
