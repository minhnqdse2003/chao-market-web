'use client';
import { GeneralBanner } from '@/components/app-banner';
import { Clock, Handshake, Mail, Users } from 'lucide-react'; // Import relevant Lucide icons
import { T } from '@/components/app-translate';
import { ReactNode } from 'react';
import { useI18n } from '@/context/i18n/context';

interface ContactCard {
    icon: React.ReactNode;
    title: string | ReactNode;
    description: string | ReactNode;
    contactInfo?: string | ReactNode;
    isLink?: boolean;
    href?: string;
}

export default function ContactsPage() {
    const { t } = useI18n();
    const contactCards: ContactCard[] = [
        {
            icon: (
                <Users
                    size={60}
                    className="dark:text-[var(--brand-color)] text-brand-text mb-6"
                />
            ),
            title: <T keyName={'common.consulting'} />,
            description: <T keyName={'common.consultingSubtitle'} />,
            contactInfo: 'consulting@chaomarket.com',
            isLink: true,
            href: 'mailto:consulting@chaomarket.com',
        },
        {
            icon: (
                <Handshake
                    size={60}
                    className={
                        'dark:text-[var(--brand-color)] text-brand-text mb-6'
                    }
                />
            ),
            title: <T keyName={'common.support'} />,
            description: <T keyName={'common.hereToHelp'} />,
            contactInfo: 'support@chaomarket.com',
            isLink: true,
            href: 'mailto:support@chaomarket.com',
        },
        {
            icon: (
                <Mail
                    size={60}
                    className="dark:text-[var(--brand-color)] text-brand-text mb-6"
                />
            ),
            title: <T keyName={'common.contact'} />,
            description: <T keyName={'common.generalInquiries'} />,
            contactInfo: 'contact@chaomarket.com',
            isLink: true,
            href: 'mailto:contact@chaomarket.com',
        },
        {
            icon: (
                <Clock
                    size={60}
                    className="dark:text-[var(--brand-color)] text-brand-text mb-6"
                />
            ),
            title: <T keyName={'common.workingHours'} />,
            description: (
                <span
                    dangerouslySetInnerHTML={{ __html: t('common.phoneHours') }}
                />
            ),
            isLink: true,
        },
    ];

    return (
        <div className="w-full h-full">
            <GeneralBanner />
            {/* Keep the original layout structure */}
            <p className="font-semibold text-2xl mb-4">Let us help you</p>
            <div className='flex flex-row dark:[&>div[data-slot="Card"]]:bg-[var(--brand-black-bg)] [&>div[data-slot="Card"]]:bg-[var(--brand-grey)]  [&>div[data-slot="Card"]]:px-8 [&>div[data-slot="Card"]]:shadow-sm [&>div[data-slot="Card"]]:py-10 [&>div[data-slot="Card"]]:rounded-2xl gap-2'>
                {contactCards.map((card, index) => {
                    const ContactInfoElement = card.isLink ? 'a' : 'p';
                    const contactInfoProps = card.isLink
                        ? {
                              href: card.href,
                              className: 'font-bold hover:underline',
                          }
                        : { className: 'font-bold' };

                    return (
                        <div
                            key={index}
                            data-slot="Card"
                            className="flex basis-1/4 flex-col justify-center gap-2"
                        >
                            {card.icon}
                            <p className={`font-bold`}>{card.title}</p>
                            <p className="text-brand-text/90">
                                {card.description}
                            </p>
                            {/* Render contact info as a link or plain text */}
                            {card.contactInfo && (
                                <ContactInfoElement {...contactInfoProps}>
                                    {card.contactInfo}
                                </ContactInfoElement>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
