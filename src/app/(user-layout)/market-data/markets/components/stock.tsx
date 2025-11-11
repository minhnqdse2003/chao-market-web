'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { MARKET_SYMBOL, TMarketSymbolKey } from '@/constant/market-query';
import { calculateAdjustedHeight } from '@/utils/height-utils';
import { AppTabs, TabItem } from '@/components/app-tabs';
import VietnamComp from '@/app/(user-layout)/market-data/indices/components/vietnam';
import VietnamTradingView from '@/app/(user-layout)/market-data/indices/components/vietnam-trading-view';
import CombinedNewsFeed, {
    NewsSourceType,
} from '@/app/(user-layout)/market-data/markets/components/vietnam-stock-market-news';
import { useI18n } from '@/context/i18n/context';
import Script from 'next/script';
import { cn } from '@/lib/utils';
import { MetaDataConfig } from '@/services/meta_data';
import { getRssLink } from '@/lib/get-rss-link-from-meta-data';

const USA_SYMBOL_KEYS: TMarketSymbolKey[] = [
    'INDEX_DXY',
    'CAPITAL_VIX',
    'SPREADEX_SPX',
    'SPREADEX_DJI',
    'NASDAQ_NDX',
];

const USA_SYMBOLS = USA_SYMBOL_KEYS.map(key => ({
    s: MARKET_SYMBOL[key].name,
    d: MARKET_SYMBOL[key].description,
    'currency-logoid': MARKET_SYMBOL[key]?.currencyLogoId,
    logoid: MARKET_SYMBOL[key]?.logoId,
}));

const CURRENCIES_SYMBOL_KEYS: TMarketSymbolKey[] = [
    'INDEX_DXY',
    'OANDA_EURUSD',
    'OANDA_GBPUSD',
    'OANDA_USDJPY',
    'OANDA_USDCHF',
    'OANDA_AUDUSD',
    'OANDA_USDCAD',
    'OANDA_NZDUSD',
];

const CURRENCIES_SYMBOLS = CURRENCIES_SYMBOL_KEYS.map(key => ({
    s: MARKET_SYMBOL[key].name,
    d: MARKET_SYMBOL[key].description,
    'currency-logoid': MARKET_SYMBOL[key]?.currencyLogoId,
    'base-currency-logoid': MARKET_SYMBOL[key]?.baseCurrencyLogoId,
    logoid: MARKET_SYMBOL[key]?.logoId,
}));

const CRYPTOCURRENCIES_SYMBOL_KEYS: TMarketSymbolKey[] = [
    'CRYPTOCAP_BTCD',
    'BINANCE_BTCUSD',
    'BINANCE_ETHUSD',
    'BINANCE_SOLUSD',
    'BINANCE_AVAXUSD',
    'BINANCE_ADAUSD',
    'BINANCE_BNBUSD',
];

const CRYPTOCURRENCIES_SYMBOLS = CRYPTOCURRENCIES_SYMBOL_KEYS.map(key => ({
    s: MARKET_SYMBOL[key].name,
    d: MARKET_SYMBOL[key].description,
    'currency-logoid': MARKET_SYMBOL[key]?.currencyLogoId,
    'base-currency-logoid': MARKET_SYMBOL[key]?.baseCurrencyLogoId,
    logoid: MARKET_SYMBOL[key]?.logoId,
}));

const COMMODITIES_SYMBOL_KEYS: TMarketSymbolKey[] = [
    'INDEX_DXY',
    'INDEX_BDI',
    'OANDA_XAUUSD',
    'OANDA_XAGUSD',
    'BLACKBULL_WTI',
];

const COMMODITIES_SYMBOLS = COMMODITIES_SYMBOL_KEYS.map(key => ({
    s: MARKET_SYMBOL[key].name,
    d: MARKET_SYMBOL[key].description,
    'currency-logoid': MARKET_SYMBOL[key]?.currencyLogoId,
    'base-currency-logoid': MARKET_SYMBOL[key]?.baseCurrencyLogoId,
    logoid: MARKET_SYMBOL[key]?.logoId,
}));

export const LIGHT_THEME_CONFIG_OVERVIEW = {
    colorTheme: 'light',
    dateRange: '12M',
    locale: 'en',
    largeChartUrl: '',
    isTransparent: true,
    showFloatingTooltip: false,
    plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
    plotLineColorFalling: 'rgba(41, 98, 255, 1)',
    gridLineColor: 'rgba(240, 243, 250, 0)',
    scaleFontColor: '#0F0F0F',
    belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
    belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
    belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
    belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
    symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
    tabs: [
        {
            title: 'Forex',
            symbols: USA_SYMBOLS,
            originalTitle: 'Forex',
        },
    ],
    support_host: 'https://www.tradingview.com',
    showSymbolLogo: true,
    showChart: true,
    height: 600,
};

const DARK_THEME_CONFIG_OVERVIEW = {
    ...LIGHT_THEME_CONFIG_OVERVIEW,
    colorTheme: 'dark',
    scaleFontColor: '#F1F1F1',
};

const CURRENCIES_SYMBOLS_CONFIG_OVERVIEW = (
    currentThemeConfig: typeof LIGHT_THEME_CONFIG_OVERVIEW
) => {
    return {
        ...currentThemeConfig,
        tabs: [
            {
                title: 'Currencies',
                symbols: CURRENCIES_SYMBOLS,
                originalTitle: 'Currencies',
            },
        ],
    };
};

const CRYPTOCURRENCIES_SYMBOLS_CONFIG_OVERVIEW = (
    currentThemeConfig: typeof LIGHT_THEME_CONFIG_OVERVIEW
) => {
    return {
        ...currentThemeConfig,
        tabs: [
            {
                title: 'CryptoCurrencies',
                symbols: CRYPTOCURRENCIES_SYMBOLS,
                originalTitle: 'CryptoCurrencies',
            },
        ],
    };
};

const COMMODITIES_SYMBOLS_CONFIG_OVERVIEW = (
    currentThemeConfig: typeof LIGHT_THEME_CONFIG_OVERVIEW
) => {
    return {
        ...currentThemeConfig,
        tabs: [
            {
                title: 'Commodities',
                symbols: COMMODITIES_SYMBOLS,
                originalTitle: 'Commodities',
            },
        ],
    };
};

const LIGHT_THEME_CONFIG_STOCK_HEATMAP = {
    dataSource: 'AllUSA',
    blockSize: 'market_cap_basic',
    blockColor: 'change',
    grouping: 'sector',
    locale: 'en',
    symbolUrl: '',
    colorTheme: 'light',
    exchanges: [],
    hasTopBar: true,
    isDataSetEnabled: false,
    isZoomEnabled: true,
    hasSymbolTooltip: true,
    isMonoSize: false,
    width: '100%',
    height: 800,
};

const DARK_THEME_CONFIG_STOCK_HEATMAP = {
    ...LIGHT_THEME_CONFIG_STOCK_HEATMAP,
    colorTheme: 'dark',
};

const LIGHT_THEME_CONFIG_FOREX_HEATMAP = {
    colorTheme: 'light',
    isTransparent: false,
    locale: 'en',
    currencies: ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD', 'CNY'],
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 800,
};

const DARK_THEME_CONFIG_FOREX_HEATMAP = {
    ...LIGHT_THEME_CONFIG_FOREX_HEATMAP,
    colorTheme: 'dark',
    backgroundColor: '#252525',
};

const LIGHT_THEME_CONFIG_CRYPTO_HEATMAP = {
    dataSource: 'Crypto',
    blockSize: 'market_cap_calc',
    blockColor: '24h_close_change|5',
    locale: 'en',
    symbolUrl: '',
    colorTheme: 'light',
    hasTopBar: false,
    isDataSetEnabled: false,
    isZoomEnabled: true,
    hasSymbolTooltip: true,
    isMonoSize: false,
    width: '100%',
    height: 800,
};

const DARK_THEME_CONFIG_CRYPTO_HEATMAP = {
    ...LIGHT_THEME_CONFIG_CRYPTO_HEATMAP,
    colorTheme: 'dark',
};

const MARKET_DATA_HEATMAP_SYMBOL_KEYS: TMarketSymbolKey[] = [
    'INDEX_DXY',
    'INDEX_BDI',
    'OANDA_XAUUSD',
    'OANDA_XAGUSD',
    'BLACKBULL_WTI',
];

const MARKET_DATA_HEATMAP_SYMBOLS = MARKET_DATA_HEATMAP_SYMBOL_KEYS.map(
    key => ({
        name: MARKET_SYMBOL[key].name,
        displayName: MARKET_SYMBOL[key].description,
    })
);

const LIGHT_THEME_CONFIG_MARKET_DATA_HEATMAP = {
    colorTheme: 'dark',
    locale: 'en',
    largeChartUrl: '',
    isTransparent: true,
    showSymbolLogo: true,
    backgroundColor: '#0F0F0F',
    support_host: 'https://www.tradingview.com',
    width: '100%',
    height: 300,
    symbolsGroups: [
        {
            name: 'Forex',
            symbols: MARKET_DATA_HEATMAP_SYMBOLS,
        },
    ],
};

const DARK_THEME_CONFIG_MARKET_DATA_HEATMAP = {
    ...LIGHT_THEME_CONFIG_MARKET_DATA_HEATMAP,
    colorTheme: 'dark',
    backgroundColor: '#252525',
};

const LIGHT_THEME_CONFIG_CHART = {
    allow_symbol_change: true,
    calendar: false,
    details: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hotlist: false,
    interval: 'D',
    locale: 'en',
    save_image: true,
    style: '1',
    symbol: 'INDEX:DXY',
    theme: 'light',
    timezone: 'Etc/UTC',
    backgroundColor: '#FFFFFF',
    gridColor: '#0F0F0F',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    width: '100%',
    height: 800,
    autosize: true,
};

const DARK_THEME_CONFIG_CHART = {
    ...LIGHT_THEME_CONFIG_CHART,
    theme: 'dark',
    backgroundColor: '#252525',
    gridColor: 'rgba(242, 242, 242, 0.06)',
};

const LIGHT_THEME_CONFIG_CRYPTOCURRENCIES_CHART = {
    ...LIGHT_THEME_CONFIG_CHART,
    symbol: MARKET_SYMBOL.BINANCE_BTCUSD.name,
};

const DARK_THEME_CONFIG_CRYPTOCURRENCIES_CHART = {
    ...LIGHT_THEME_CONFIG_CRYPTOCURRENCIES_CHART,
    theme: 'dark',
    backgroundColor: '#252525',
    gridColor: 'rgba(242, 242, 242, 0.06)',
    symbol: MARKET_SYMBOL.BINANCE_BTCUSD.name,
};

const LIGHT_THEME_CONFIG_COMMODITIES_CHART = {
    ...LIGHT_THEME_CONFIG_CHART,
    symbol: MARKET_SYMBOL.OANDA_XAUUSD.name,
};

const DARK_THEME_CONFIG_COMMODITIES_CHART = {
    ...LIGHT_THEME_CONFIG_COMMODITIES_CHART,
    theme: 'dark',
    backgroundColor: '#252525',
    gridColor: 'rgba(242, 242, 242, 0.06)',
    symbol: MARKET_SYMBOL.OANDA_XAUUSD.name,
};

// const LIGHT_THEME_CONFIG_NEWS = {
//     displayMode: 'adaptive',
//     feedMode: 'market',
//     colorTheme: 'light',
//     isTransparent: false,
//     locale: 'en',
//     market: 'stock',
//     width: '100%',
//     height: 520,
// };
//
// const DARK_THEME_CONFIG_NEWS = {
//     ...LIGHT_THEME_CONFIG_NEWS,
//     colorTheme: 'dark',
// };
//
// const LIGHT_THEME_CONFIG_CURRENCIES_NEWS = {
//     ...LIGHT_THEME_CONFIG_NEWS,
//     market: 'forex',
// };
//
// const DARK_THEME_CONFIG_CURRENCIES_NEWS = {
//     ...DARK_THEME_CONFIG_NEWS,
//     market: 'forex',
// };
//
// const LIGHT_THEME_CONFIG_CRYPTOCURRENCIES_NEWS = {
//     ...LIGHT_THEME_CONFIG_NEWS,
//     market: 'crypto',
// };
//
// const DARK_THEME_CONFIG_CRYPTOCURRENCIES_NEWS = {
//     ...DARK_THEME_CONFIG_NEWS,
//     market: 'crypto',
// };
//
// const LIGHT_THEME_CONFIG_NEWS_SYMBOL = {
//     displayMode: 'adaptive',
//     feedMode: 'symbol',
//     symbol: MARKET_SYMBOL.OANDA_XAUUSD.name,
//     colorTheme: 'light',
//     isTransparent: false,
//     locale: 'en',
//     width: '100%',
//     height: 800,
// };
//
// const DARK_THEME_CONFIG_NEWS_SYMBOL = {
//     ...LIGHT_THEME_CONFIG_NEWS_SYMBOL,
//     colorTheme: 'dark',
// };
//
// const LIGHT_THEME_CONFIG_COMMODITIES_NEWS = {
//     ...LIGHT_THEME_CONFIG_NEWS_SYMBOL,
//     symbol: MARKET_SYMBOL.OANDA_XAUUSD.name,
// };
//
// const DARK_THEME_CONFIG_COMMODITIES_NEWS = {
//     ...DARK_THEME_CONFIG_NEWS_SYMBOL,
//     symbol: MARKET_SYMBOL.OANDA_XAUUSD.name,
// };

export const LIGHT_THEME_CONFIG_ECONOMY_CALENDAR = {
    colorTheme: 'light',
    locale: 'en',
    countryFilter: 'us',
    importanceFilter: '-1,0,1',
    width: '100%',
    isTransparent: true,
    height: 800,
};

const DARK_THEME_CONFIG_ECONOMY_CALENDAR = {
    ...LIGHT_THEME_CONFIG_ECONOMY_CALENDAR,
    colorTheme: 'dark',
};

const LIGHT_THEME_CONFIG_CURRENCIES_CALENDAR = {
    ...LIGHT_THEME_CONFIG_ECONOMY_CALENDAR,
    countryFilter: 'us,eu,jp,gb,ch,au,ca,nz,cn',
};

const DARK_THEME_CONFIG_CURRENCIES_CALENDAR = {
    ...LIGHT_THEME_CONFIG_CURRENCIES_CALENDAR,
    colorTheme: 'dark',
};

const LIGHT_THEME_CONFIG_CRYPTOCURRENCIES_CALENDAR = {
    ...LIGHT_THEME_CONFIG_ECONOMY_CALENDAR,
    countryFilter: 'us,eu',
};

const DARK_THEME_CONFIG_CRYPTOCURRENCIES_CALENDAR = {
    ...LIGHT_THEME_CONFIG_CRYPTOCURRENCIES_CALENDAR,
    colorTheme: 'dark',
};

const LIGHT_THEME_CONFIG_VI_CALENDAR = {
    ...LIGHT_THEME_CONFIG_ECONOMY_CALENDAR,
    countryFilter: 'vn',
};

const DARK_THEME_CONFIG_VI_CALENDAR = {
    ...LIGHT_THEME_CONFIG_VI_CALENDAR,
    colorTheme: 'dark',
};

const LIGHT_THEME_CONFIG_MARKET_DATA_SCREENER = {
    market: 'vietnam',
    showToolbar: true,
    defaultColumn: 'overview',
    defaultScreen: 'most_capitalized',
    isTransparent: false,
    locale: 'en',
    colorTheme: 'light',
    width: '100%',
    height: 550,
};

const DARK_THEME_CONFIG_MARKET_DATA_SCREENER = {
    ...LIGHT_THEME_CONFIG_MARKET_DATA_SCREENER,
    colorTheme: 'dark',
};

type MARKET_TYPES =
    | 'us'
    | 'currencies'
    | 'crypto'
    | 'commodities'
    | 'vi'
    | string;

const CryptoTickerWidget = () => {
    const { theme } = useTheme();
    return theme === 'dark' ? (
        <>
            <Script src="https://widgets.coingecko.com/gecko-coin-market-ticker-list-widget.js"></Script>
            <gecko-coin-market-ticker-list-widget
                locale="en"
                dark-mode="true"
                coin-id="bitcoin"
                initial-currency="usd"
            ></gecko-coin-market-ticker-list-widget>
        </>
    ) : (
        <>
            <Script src="https://widgets.coingecko.com/gecko-coin-market-ticker-list-widget.js"></Script>
            <gecko-coin-market-ticker-list-widget
                locale="en"
                dark-mode="false"
                coin-id="bitcoin"
                initial-currency="usd"
            ></gecko-coin-market-ticker-list-widget>
        </>
    );
};

function OverViews({ type }: { type: MARKET_TYPES }) {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const getThemeConfig = useCallback(() => {
        const currentThemeConfig =
            theme === 'dark'
                ? DARK_THEME_CONFIG_OVERVIEW
                : LIGHT_THEME_CONFIG_OVERVIEW;
        switch (type) {
            case 'currencies':
                return CURRENCIES_SYMBOLS_CONFIG_OVERVIEW(currentThemeConfig);
            case 'crypto':
                return CRYPTOCURRENCIES_SYMBOLS_CONFIG_OVERVIEW(
                    currentThemeConfig
                );
            case 'commodities':
                return COMMODITIES_SYMBOLS_CONFIG_OVERVIEW(currentThemeConfig);
            case 'us':
            default:
                return currentThemeConfig;
        }
    }, [theme]);

    useEffect(() => {
        if (container.current) {
            container.current.innerHTML = '';
        }

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        script.type = 'text/javascript';
        script.async = true;
        // Get the theme config and modify the height
        const config = getThemeConfig();

        const configWithModifiedHeight = {
            ...config,
            height: calculateAdjustedHeight(),
        };

        script.innerHTML = JSON.stringify(configWithModifiedHeight);
        if (container.current) container.current.appendChild(script);

        return () => {
            if (container.current) {
                container.current.innerHTML = '';
            }
        };
    }, [theme]);

    const height = calculateAdjustedHeight();

    if (type === 'crypto') {
        return (
            <div className={'w-full flex gap-2'}>
                <div
                    id="tradingview-market-overview"
                    className="tradingview-widget-container"
                    ref={container}
                    style={{ width: '60%', height: '40.5rem' }}
                >
                    <div className="tradingview-widget-container__widget"></div>
                </div>
                <div
                    className={cn(
                        'w-full max-w-2/5 max-h-[41.0625rem] overflow-y-scroll'
                    )}
                    style={{ height: `${height}px` }}
                >
                    <CryptoTickerWidget />
                </div>
            </div>
        );
    }

    return (
        <div
            id="tradingview-market-overview"
            className="tradingview-widget-container"
            ref={container}
            style={{ width: '100%', height: '40.5rem' }}
        >
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

function HeatMap({ type }: { type: MARKET_TYPES }) {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const getCurrentSrc = useCallback(() => {
        switch (type) {
            case 'currencies':
                return 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js';
            case 'crypto':
                return 'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js';
            case 'commodities':
                return 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
            case 'us':
            default:
                return 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
        }
    }, []);

    const getCurrentConfig = useCallback(() => {
        const isDarkTheme = theme === 'dark';
        switch (type) {
            case 'currencies':
                return isDarkTheme
                    ? DARK_THEME_CONFIG_FOREX_HEATMAP
                    : LIGHT_THEME_CONFIG_FOREX_HEATMAP;
            case 'crypto':
                return isDarkTheme
                    ? DARK_THEME_CONFIG_CRYPTO_HEATMAP
                    : LIGHT_THEME_CONFIG_CRYPTO_HEATMAP;
            case 'commodities':
                return isDarkTheme
                    ? DARK_THEME_CONFIG_MARKET_DATA_HEATMAP
                    : LIGHT_THEME_CONFIG_MARKET_DATA_HEATMAP;
            case 'us':
            default:
                return isDarkTheme
                    ? DARK_THEME_CONFIG_STOCK_HEATMAP
                    : LIGHT_THEME_CONFIG_STOCK_HEATMAP;
        }
    }, [theme]);

    useEffect(() => {
        // Clean up any existing script or widget content to prevent duplication
        if (container.current) {
            container.current.innerHTML = '';
        }

        const script = document.createElement('script');
        script.src = getCurrentSrc();
        script.type = 'text/javascript';
        script.async = true;
        // Get the theme config and modify the height
        const config = getCurrentConfig();

        const configWithModifiedHeight = {
            ...config,
            height: calculateAdjustedHeight(),
        };

        script.innerHTML = JSON.stringify(configWithModifiedHeight);

        if (container.current) container.current.appendChild(script);
        return () => {
            if (container.current) {
                container.current.innerHTML = '';
            }
        };
    }, [theme]);

    return (
        <div
            id="tradingview-stock-heatmap"
            className="tradingview-widget-container"
            ref={container}
            style={{ width: '100%', height: '50rem' }}
        >
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

function Chart({ type }: { type: MARKET_TYPES }) {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const getCurrentThemeConfig = useCallback(() => {
        const isDarkTheme = theme === 'dark';
        switch (type) {
            case 'crypto':
                return isDarkTheme
                    ? DARK_THEME_CONFIG_CRYPTOCURRENCIES_CHART
                    : LIGHT_THEME_CONFIG_CRYPTOCURRENCIES_CHART;
            case 'commodities':
                return isDarkTheme
                    ? DARK_THEME_CONFIG_COMMODITIES_CHART
                    : LIGHT_THEME_CONFIG_COMMODITIES_CHART;
            case 'us':
            case 'currencies':
            default:
                return isDarkTheme
                    ? DARK_THEME_CONFIG_CHART
                    : LIGHT_THEME_CONFIG_CHART;
        }
    }, [theme]);

    useEffect(() => {
        if (container.current) {
            container.current.innerHTML = '';
        }

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        const config = getCurrentThemeConfig();

        const configWithModifiedHeight = {
            ...config,
            height: calculateAdjustedHeight(),
        };

        script.innerHTML = JSON.stringify(configWithModifiedHeight);
        if (container.current) container.current.appendChild(script);
        return () => {
            if (container.current) {
                container.current.innerHTML = '';
            }
        };
    }, [theme]);

    return (
        <div
            className="tradingview-widget-container"
            ref={container}
            style={{ width: '100%', height: '50rem' }}
            id={'trading-container-chart'}
        >
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

function NewsWithRssApple({
    type,
    config,
}: {
    type: MARKET_TYPES;
    config?: MetaDataConfig;
}) {
    const { locale } = useI18n();
    const data: Record<MARKET_TYPES, Record<string, NewsSourceType>> = {
        us: {
            en: 'us-stock-news-en',
            vi: 'us-stock-news-vi',
        },
        commodities: {
            en: 'commodities-news-en',
            vi: 'commodities-news-vn',
        },
        crypto: {
            en: 'crypto-currency-news-en',
            vi: 'crypto-currency-news-vn',
        },
        currencies: {
            en: 'currencies-news-en',
            vi: 'currencies-news-vi',
        },
        vi: {
            en: 'vietnam-stock-news-en',
            vi: 'vietnam-stock-news-vi',
        },
    };

    const href = getRssLink({
        key: 'tabs',
        locale,
        type,
        config,
    });

    if (href) {
        return <CombinedNewsFeed type={data[type][locale]} href={href} />;
    }

    return <CombinedNewsFeed type={data[type][locale]} />;
}

function EconomyCalendar({ type }: { type: MARKET_TYPES }) {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const getCurrentThemeConfig = useCallback(() => {
        const isDarkTheme = theme === 'dark';
        switch (type) {
            case 'crypto':
                return isDarkTheme
                    ? DARK_THEME_CONFIG_CRYPTOCURRENCIES_CALENDAR
                    : LIGHT_THEME_CONFIG_CRYPTOCURRENCIES_CALENDAR;
            case 'currencies':
                return isDarkTheme
                    ? DARK_THEME_CONFIG_CURRENCIES_CALENDAR
                    : LIGHT_THEME_CONFIG_CURRENCIES_CALENDAR;
            case 'vi':
                return isDarkTheme
                    ? DARK_THEME_CONFIG_VI_CALENDAR
                    : LIGHT_THEME_CONFIG_VI_CALENDAR;
            case 'us':
            case 'commodities':
            default:
                return isDarkTheme
                    ? DARK_THEME_CONFIG_ECONOMY_CALENDAR
                    : LIGHT_THEME_CONFIG_ECONOMY_CALENDAR;
        }
    }, [theme]);

    useEffect(() => {
        if (container.current) {
            container.current.innerHTML = '';
        }

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
        script.type = 'text/javascript';
        script.async = true;
        const config = getCurrentThemeConfig();

        const configWithModifiedHeight = {
            ...config,
            height: calculateAdjustedHeight(),
        };

        script.innerHTML = JSON.stringify(configWithModifiedHeight);
        if (container.current) container.current.appendChild(script);
        return () => {
            if (container.current) {
                container.current.innerHTML = '';
            }
        };
    }, [theme]);

    return (
        <div
            className="tradingview-widget-container rounded-xl border"
            ref={container}
            style={{ width: '100%', height: '50rem' }}
            id={'trading-view-widget-container-calendar'}
        >
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

function Screener({ type }: { type: MARKET_TYPES }) {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const getCurrentThemeConfig = useCallback(() => {
        const isDarkTheme = theme === 'dark';
        switch (type) {
            case 'crypto':
            case 'currencies':
            case 'us':
            case 'commodities':
            case 'vi':
            default:
                return isDarkTheme
                    ? DARK_THEME_CONFIG_MARKET_DATA_SCREENER
                    : LIGHT_THEME_CONFIG_MARKET_DATA_SCREENER;
        }
    }, [theme]);

    useEffect(() => {
        if (container.current) container.current.innerHTML = '';

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
        script.type = 'text/javascript';
        script.async = true;
        const config = getCurrentThemeConfig();
        const configWithModifiedHeight = {
            ...config,
            height: calculateAdjustedHeight(),
        };
        script.innerHTML = JSON.stringify(configWithModifiedHeight);
        if (container.current) container.current.appendChild(script);

        return () => {
            if (container.current) container.current.innerHTML = '';
        };
    }, [theme]);

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

function VietnamOverview() {
    return (
        <div className={'w-full flex gap-2 mx-auto'}>
            <VietnamTradingView isDivided={true} />
            <VietnamComp />
        </div>
    );
}

function ChartVietNam() {
    return (
        <div className={'w-full flex justify-center'}>
            <VietnamComp type={'dnse'} containerClassName={'w-full'} />
        </div>
    );
}

export function VietNamStockMarketNewsFeed(config?: MetaDataConfig) {
    const { locale } = useI18n();
    const href = getRssLink({
        key: 'financialNews',
        locale,
        type: 'vietname',
        config,
    });

    if (href)
        return (
            <CombinedNewsFeed
                type={'B01-market-fin-news-global-vn'}
                href={getRssLink({
                    key: 'financialNews',
                    locale,
                    type: 'vietname',
                    config,
                })}
            />
        );

    return locale === 'vi' ? (
        <CombinedNewsFeed type={'B03-market-fin-news-vietnam-vn'} />
    ) : (
        <CombinedNewsFeed type={'B04-market-fin-news-vietnam-en'} />
    );
}

function StockComp({
    type,
    config,
}: {
    type: MARKET_TYPES;
    config?: MetaDataConfig;
}) {
    const { t } = useI18n();
    const [defaultValue, setDefaultValue] = useState(
        sessionStorage.getItem('stock-type') || 'overview'
    );

    const setSessionStorageItem = (value: string) =>
        sessionStorage.setItem('stock-type', value);

    const onDefaultValueChange = (activeTab: string) => {
        setDefaultValue(activeTab);
        setSessionStorageItem(activeTab);
    };

    const tabsList: TabItem[] = [
        {
            title: t(
                'marketData.marketData.items.markets.items.usStocks.items.overview.title'
            ),
            value: 'overview',
            renderContent: () =>
                Promise.resolve(
                    type === 'vi' ? (
                        <VietnamOverview />
                    ) : (
                        <OverViews type={type} />
                    )
                ),
        },
        {
            title: t(
                'marketData.marketData.items.markets.items.usStocks.items.heatmap.title'
            ),
            value: 'heatmap',
            renderContent: () =>
                Promise.resolve(
                    type === 'vi' ? (
                        <Screener type={'vi'} />
                    ) : (
                        <HeatMap type={type} />
                    )
                ),
        },
        {
            title: t(
                'marketData.marketData.items.markets.items.usStocks.items.chart.title'
            ),
            value: 'chart',
            renderContent: () =>
                Promise.resolve(
                    type === 'vi' ? <ChartVietNam /> : <Chart type={type} />
                ),
        },
        {
            title: t(
                'marketData.marketData.items.markets.items.usStocks.items.news.title'
            ),
            value: 'news',
            renderContent: () =>
                Promise.resolve(
                    <NewsWithRssApple type={type} config={config} />
                ),
        },
        {
            title: t(
                'marketData.marketData.items.markets.items.usStocks.items.calendar.title'
            ),
            value: 'calendar',
            renderContent: () =>
                Promise.resolve(<EconomyCalendar type={type} />),
        },
    ];

    return (
        <AppTabs
            tabsList={tabsList}
            defaultValue={defaultValue}
            onValueChange={onDefaultValueChange}
        />
    );
}

export default StockComp;
