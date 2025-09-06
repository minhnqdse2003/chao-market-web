'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { COOKIE } from '@/constant/cookie';

export function useLocale() {
    const [locale, setLocaleState] = useState<string>('en');

    useEffect(() => {
        // Get initial locale from cookie or browser
        const storedLocale = Cookies.get(COOKIE.COOKIE_NAME);

        setLocaleState(storedLocale || 'en');
    }, []);

    const setLocale = (newLocale: string) => {
        setLocaleState(newLocale);
        Cookies.set(COOKIE.COOKIE_NAME, newLocale, {
            expires: 365,
            sameSite: 'strict',
            path: '/',
        });
    };

    return { locale, setLocale };
}
