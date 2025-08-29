'use client';

import { useLocale } from '@/hooks/use-locale';
import { ENLocale, VILocale } from '../../public/languages';
import Image from 'next/image';
import { Check } from 'lucide-react';
import LoadingComponent from '@/components/loading-spiner';

const languages = [
    {
        name: 'English',
        code: 'en',
        flag: ENLocale,
    },
    {
        name: 'Tiếng Việt',
        code: 'vi',
        flag: VILocale,
    },
];

export function LanguageToggle() {
    const { locale, setLocale } = useLocale();

    if (!locale) {
        return <LoadingComponent />;
    }

    return (
        <div className={'space-y-4'}>
            {languages.map(lang => (
                <div
                    key={lang.code}
                    state-checked={
                        locale === lang.code ? 'checked' : 'unchecked'
                    }
                    className={
                        'relative px-2' +
                        ' py-4 rounded-lg [&[state-checked="checked"]]:cursor-pointer' +
                        ' [&[state-checked="checked"]]:pointer-events-none cursor-pointer' +
                        ' [&[state-checked="unchecked"]]:hover:text-[var(--brand-color)]' +
                        ' [&[state-checked="unchecked"]]:hover:font-semibold' +
                        ' [&[state-checked="checked"]>.check-icon]:visible' +
                        ' transition-all! duration-75 ease-in-out' +
                        ' [&[state-checked="checked"]]:text-[var(--brand-color)]'
                    }
                    onClick={() => setLocale(lang.code)}
                >
                    <div className={'w-2/3 flex gap-4 items-center'}>
                        <Image
                            src={lang.flag}
                            alt={`locale-flag-${lang.code}`}
                            width={1920}
                            height={1080}
                            className={'h-full' + ' w-auto object-contain'}
                        />
                        <p>{lang.name}</p>
                    </div>
                    <Check
                        className={
                            'size-6 absolute right-2 invisible check-icon top-1/2 transform -translate-y-1/2'
                        }
                    />
                </div>
            ))}
        </div>
    );
}
