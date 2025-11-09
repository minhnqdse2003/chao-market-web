import { MarketConfigProps, MetaDataConfig } from '@/services/meta_data';

export const getRssLink = ({
    key,
    config,
    locale,
    type,
}: {
    key: keyof MarketConfigProps;
    config?: MetaDataConfig;
    locale: string;
    type: string;
}) => {
    const currentTab = config?.market[key].filter(item => item.type === type);

    if (currentTab && currentTab.length > 0) {
        const tab = currentTab[0];
        const localizeContent = tab.localized[locale as 'en' | 'vi'];

        return localizeContent.rss.url;
    }

    return undefined;
};
