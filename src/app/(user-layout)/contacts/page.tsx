import { GeneralBanner } from '@/components/app-banner';
import { Mail, Phone, Users } from 'lucide-react'; // Import relevant Lucide icons
import { capitalizeWords } from '@/utils/string-parsing';
import Image from 'next/image';
import { SupportIcon } from '@image/index';

interface ContactCard {
    icon: React.ReactNode;
    title: string;
    description: string;
    contactInfo: string;
    isLink?: boolean;
    href?: string;
}

export default function ContactsPage() {
    const contactCards: ContactCard[] = [
        {
            icon: (
                <Users size={60} className="text-[var(--brand-color)] mb-6" />
            ),
            title: 'Consulting',
            description: 'Let us help you find the best solutions',
            contactInfo: 'consulting@chaomarket.com',
            isLink: true,
            href: 'mailto:consulting@chaomarket.com',
        },
        {
            icon: (
                <Image
                    src={SupportIcon}
                    width={1920}
                    height={1080}
                    alt={'support-icon'}
                    className="size-[3.75rem] mb-6"
                />
            ),
            title: 'Support',
            description: "We're here to help",
            contactInfo: 'support@chaomarket.com',
            isLink: true,
            href: 'mailto:support@chaomarket.com',
        },
        {
            icon: <Mail size={60} className="text-[var(--brand-color)] mb-6" />,
            title: 'Contact',
            description: 'General inquiries',
            contactInfo: 'contact@chaomarket.com',
            isLink: true,
            href: 'mailto:contact@chaomarket.com',
        },
        {
            icon: (
                <Phone size={60} className="text-[var(--brand-color)] mb-6" />
            ),
            title: 'Phone',
            description: 'Mon-Fri from 8am to 5pm',
            contactInfo: '098 586 5674',
            isLink: true,
            href: 'tel:0985865674',
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
                            <p className={`font-bold`}>
                                {capitalizeWords(card.title)}
                            </p>
                            <p className="text-[var(--brand-grey-foreground)]">
                                {card.description}
                            </p>
                            {/* Render contact info as a link or plain text */}
                            <ContactInfoElement {...contactInfoProps}>
                                {card.contactInfo}
                            </ContactInfoElement>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
