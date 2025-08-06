export default function getPathnameFromUrl(urlString: string): string {
    try {
        // Handle cases where urlString might be just a path
        if (urlString.startsWith('/')) {
            return urlString;
        }

        // Handle full URLs
        const url = new URL(urlString);
        return url.pathname;
    } catch (error) {
        // Fallback to root if parsing fails
        console.warn('Failed to parse URL:', urlString, error);
        return '/';
    }
}
