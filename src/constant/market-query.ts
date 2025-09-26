// Define the structure for a single symbol
type TSymbolInfo = {
    name: string;
    description: string;
    currencyLogoId?: TCurrencyLogoId;
    logoId?: TLogoId;
    baseCurrencyLogoId?: TBaseCurrencyLogoId;
};

// Create a type for the keys (symbol identifiers)
export type TMarketSymbolKey =
    | 'ASX_XJO'
    | 'BINANCE_ADAUSD'
    | 'BINANCE_AVAXUSD'
    | 'BINANCE_BNBUSD'
    | 'BINANCE_BTCUSD'
    | 'BINANCE_ETHUSD'
    | 'BINANCE_SOLUSD'
    | 'BLACKBULL_BRENT'
    | 'BLACKBULL_WTI'
    | 'CAPITAL_VIX'
    | 'CRYPTOCAP_BTCD'
    | 'GOMARKETS_FTSE100'
    | 'HSI_HSI'
    | 'ICE_USDVND'
    | 'INDEX_BDI'
    | 'INDEX_DXY'
    | 'NASDAQ_NDX'
    | 'NIKKEI_NIKKEI225'
    | 'NSE_NIFTY'
    | 'OANDA_AUDUSD'
    | 'OANDA_EURUSD'
    | 'OANDA_GBPUSD'
    | 'OANDA_NZDUSD'
    | 'OANDA_USDCHF'
    | 'OANDA_USDCAD'
    | 'OANDA_USDJPY'
    | 'OANDA_XAGUSD'
    | 'OANDA_XAUUSD'
    | 'SSE_000001'
    | 'SSE_000300'
    | 'SPREADEX_DJI'
    | 'SPREADEX_SPX'
    | 'VANTAGE_BTCETH'
    | 'BSE_SENSEX'
    | 'BSE_SNXN30'
    | 'XETR_DAX';

// --- UPDATED TYPES ---
export type TCurrencyLogoId =
    | 'country/CA'
    | 'country/CH'
    | 'country/JP'
    | 'country/US'
    | 'crypto/XTVCETH';

export type TBaseCurrencyLogoId =
    | 'country/AU'
    | 'country/EU'
    | 'country/GB'
    | 'country/NZ'
    | 'country/US'
    | 'crypto/XTVCADA'
    | 'crypto/XTVCAVAX'
    | 'crypto/XTVCBNB'
    | 'crypto/XTVCBTC'
    | 'crypto/XTVCETH'
    | 'crypto/XTVCSOL';

export type TLogoId =
    | 'crude-oil'
    | 'crypto/XTVCBTC'
    | 'indices/nasdaq-100'
    | 'indices/u-s-dollar-index'
    | 'metal/silver';

type TMarketSymbol = Record<TMarketSymbolKey, TSymbolInfo>;

export const MARKET_SYMBOL: TMarketSymbol = {
    ASX_XJO: {
        name: 'ASX:XJO',
        description: 'Australia 200 Index (S&P/ASX 200)',
    },
    BINANCE_ADAUSD: {
        name: 'BINANCE:ADAUSD',
        description: 'Cardano / US Dollar',
        baseCurrencyLogoId: 'crypto/XTVCADA',
        currencyLogoId: 'country/US',
    },
    BINANCE_AVAXUSD: {
        name: 'BINANCE:AVAXUSD',
        description: 'AVAX / US Dollar',
        baseCurrencyLogoId: 'crypto/XTVCAVAX',
        currencyLogoId: 'country/US',
    },
    BINANCE_BNBUSD: {
        name: 'BINANCE:BNBUSD',
        description: 'Binance Coin / US Dollar',
        baseCurrencyLogoId: 'crypto/XTVCBNB',
        currencyLogoId: 'country/US',
    },
    BINANCE_BTCUSD: {
        name: 'BINANCE:BTCUSD',
        description: 'Bitcoin / US Dollar',
    },
    BINANCE_ETHUSD: {
        name: 'BINANCE:ETHUSD',
        description: 'Ethereum / US Dollar',
        baseCurrencyLogoId: 'crypto/XTVCETH',
        currencyLogoId: 'country/US',
    },
    BINANCE_SOLUSD: {
        name: 'BINANCE:SOLUSD',
        description: 'SOL / US Dollar',
        baseCurrencyLogoId: 'crypto/XTVCSOL',
        currencyLogoId: 'country/US',
    },
    BLACKBULL_BRENT: {
        name: 'BLACKBULL:BRENT',
        description: 'Brent Crude Oil',
        logoId: 'crude-oil',
        currencyLogoId: 'country/US',
    },
    BLACKBULL_WTI: {
        name: 'BLACKBULL:WTI',
        description: 'WTI Crude Oil',
    },
    CAPITAL_VIX: {
        name: 'CAPITALCOM:VIX',
        description: 'CBOE Volatility Index',
        currencyLogoId: 'country/US',
    },
    CRYPTOCAP_BTCD: {
        name: 'CRYPTOCAP:BTC.D',
        description: 'Market Cap BTC Dominance, %',
        logoId: 'crypto/XTVCBTC',
    },
    GOMARKETS_FTSE100: {
        name: 'GOMARKETS:FTSE100',
        description: 'UK 100 Index (FTSE 100)',
    },
    HSI_HSI: {
        name: 'HSI:HSI',
        description: 'Hang Seng Index (Hong Kong)',
    },
    ICE_USDVND: {
        name: 'FX_IDC:USDVND',
        description: 'US Dollar / Vietnamese Dong',
    },
    INDEX_BDI: {
        name: 'INDEX:BDI',
        description: 'BALTIC DRY INDEX',
        currencyLogoId: 'country/US',
    },
    INDEX_DXY: {
        name: 'INDEX:DXY',
        description: 'US Dollar Index',
        currencyLogoId: 'country/US',
        logoId: 'indices/u-s-dollar-index',
    },
    NASDAQ_NDX: {
        name: 'NASDAQ:NDX',
        description: 'Nasdaq 100 Index',
        currencyLogoId: 'country/US',
        logoId: 'indices/nasdaq-100',
    },
    NIKKEI_NIKKEI225: {
        name: 'FRED:NIKKEI225',
        description: 'Japan 225 Index (Nikkei 225)',
    },
    NSE_NIFTY: {
        name: 'NSE:NIFTY',
        description: 'India 50 Index (NIFTY 50)',
    },
    OANDA_AUDUSD: {
        name: 'OANDA:AUDUSD',
        description: 'AUD / USD',
        baseCurrencyLogoId: 'country/AU',
        currencyLogoId: 'country/US',
    },
    OANDA_EURUSD: {
        name: 'OANDA:EURUSD',
        description: 'EURO / US Dollar',
        baseCurrencyLogoId: 'country/EU',
        currencyLogoId: 'country/US',
    },
    OANDA_GBPUSD: {
        name: 'OANDA:GBPUSD',
        description: 'GPB / USD',
        baseCurrencyLogoId: 'country/GB',
        currencyLogoId: 'country/US',
    },
    OANDA_NZDUSD: {
        name: 'OANDA:NZDUSD',
        description: 'NZD / USD',
        baseCurrencyLogoId: 'country/NZ',
        currencyLogoId: 'country/US',
    },
    OANDA_USDCHF: {
        name: 'OANDA:USDCHF',
        description: 'USD / CHF',
        baseCurrencyLogoId: 'country/US',
        currencyLogoId: 'country/CH',
    },
    OANDA_USDCAD: {
        name: 'OANDA:USDCAD',
        description: 'USD / CAD',
        baseCurrencyLogoId: 'country/US',
        currencyLogoId: 'country/CA',
    },
    OANDA_USDJPY: {
        name: 'OANDA:USDJPY',
        description: 'USD / JPY',
        baseCurrencyLogoId: 'country/US',
        currencyLogoId: 'country/JP',
    },
    OANDA_XAGUSD: {
        name: 'OANDA:XAGUSD',
        description: 'Silver',
        logoId: 'metal/silver',
        currencyLogoId: 'country/US',
    },
    OANDA_XAUUSD: {
        name: 'OANDA:XAUUSD',
        description: 'Gold Spot / US Dollar',
    },
    SSE_000001: {
        name: 'SSE:000001',
        description: 'Shanghai Composite Index',
    },
    SSE_000300: {
        name: 'SSE:000300',
        description: 'China CSI 300 Index',
    },
    SPREADEX_DJI: {
        name: 'SPREADEX:DJI',
        description: 'Dow Jones Industrial Average',
        currencyLogoId: 'country/US',
    },
    SPREADEX_SPX: {
        name: 'SPREADEX:SPX',
        description: 'S&P 500 Index',
        currencyLogoId: 'country/US',
    },
    VANTAGE_BTCETH: {
        name: 'VANTAGE:BTCETH',
        description: 'Bitcoin / Ethereum',
        baseCurrencyLogoId: 'crypto/XTVCBTC',
        currencyLogoId: 'crypto/XTVCETH',
    },
    XETR_DAX: {
        name: 'XETR:DAX',
        description: 'Germany 40 Index (DAX)',
    },
    BSE_SENSEX: {
        name: 'BSE:SENSEX',
        description: 'S&P BSE Sensex Index',
    },
    BSE_SNXN30: {
        name: 'BSE:SNXN30',
        description: 'BSE Sensex Next 30',
    },
};
