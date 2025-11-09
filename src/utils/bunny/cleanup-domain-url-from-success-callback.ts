export const cleanupDomainUrlFromSuccessCallback = (fullUrl: string) => {
    try {
        const url = new URL(fullUrl);
        return url.pathname.substring(1); // removes leading '/'
    } catch {
        console.warn('Invalid URL passed to extractBunnyPath:', fullUrl);
        const match = fullUrl.match(/\.com\/(.+)$/);
        return match ? match[1] : fullUrl;
    }
};
