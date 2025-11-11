'use client';

import { AppTabs, TabItem } from '@/components/app-tabs';
import { calculateAdjustedHeight } from '@/utils/height-utils';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useMetaData } from '@/hooks/use-meta-data';
import { useI18n } from '@/context/i18n/context';
import { getRssLink, GetRssLinkProps } from '@/lib/get-rss-link-from-meta-data';
import CombinedNewsFeed from '../../market-data/markets/components/vietnam-stock-market-news';
import AppLoader from '@/components/app-loader';

interface PageProps {
    searchParams: {
        tab?: string;
    };
}

const RssFeedRender = ({
    locale,
    type,
    config,
    title,
}: Omit<GetRssLinkProps, 'key'> & {
    title: string;
    type: 'Facebook' | 'Tiktok' | 'Youtube';
}) => {
    const href = getRssLink({
        key: 'socials',
        locale,
        type,
        config,
    });

    if (href) {
        return (
            <CombinedNewsFeed
                type={'B01-market-fin-news-global-vn'}
                href={href}
            />
        );
    }
    return <p>{title}</p>;
};

export default function SocialPage({ searchParams }: PageProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { tab } = use(searchParams);
    const height = calculateAdjustedHeight();
    const router = useRouter();
    const { data: config, isLoading } = useMetaData();
    const { locale, t } = useI18n();

    const tabsList: TabItem[] = height
        ? [
              {
                  title: 'Facebook',
                  value: `facebook`,
                  renderContent: () =>
                      Promise.resolve(
                          <RssFeedRender
                              locale={locale}
                              title={t('common.noFeedFound')}
                              type="Facebook"
                              config={config}
                          />
                      ),
              },
              {
                  title: 'Tiktok',
                  value: 'tiktok',
                  renderContent: () =>
                      Promise.resolve(
                          <RssFeedRender
                              locale={locale}
                              title={t('common.noFeedFound')}
                              type="Tiktok"
                              config={config}
                          />
                      ),
              },
              {
                  title: 'Youtube',
                  value: 'youtube',
                  renderContent: () =>
                      Promise.resolve(
                          <RssFeedRender
                              locale={locale}
                              title={t('common.noFeedFound')}
                              type="Youtube"
                              config={config}
                          />
                      ),
              },
          ]
        : [];

    if (isLoading) {
        return <AppLoader />;
    }

    return (
        <div>
            <AppTabs
                tabsList={tabsList}
                size={2}
                defaultValue={tab}
                onValueChange={(value: string) => {
                    if (value)
                        router.push('/chao-investors/social?tab=' + value);
                }}
            />
        </div>
    );
}
