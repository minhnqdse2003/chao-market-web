import { GeneralBanner } from '@/components/app-banner';
import { Headset, MapPin, MessageSquareMore, PhoneCall } from 'lucide-react';
import { capitalizeWords } from '@/utils/string-parsing';

interface ContactCard {
    icon: React.ReactNode;
    title: string;
    description: string;
    contactInfo: string;
    isLink?: boolean;
}

export default function ContactsPage() {
    const contactCards: ContactCard[] = [
        {
            icon: (
                <MessageSquareMore
                    size={60}
                    className="text-[var(--brand-color)] mb-6"
                />
            ),
            title: 'Chat to sales',
            description: 'Get better deal with our sales team',
            contactInfo: 'sales@chaomarket.com',
            isLink: true,
        },
        {
            icon: (
                <Headset size={60} className="text-[var(--brand-color)] mb-6" />
            ),
            title: 'Chat to support',
            description: "We're here to help",
            contactInfo: 'support@chaomarket.com',
            isLink: true,
        },
        {
            icon: (
                <MapPin size={60} className="text-[var(--brand-color)] mb-6" />
            ),
            title: 'Visit us',
            description: 'Visit out HQ',
            contactInfo: 'View on Google Maps',
            isLink: true,
        },
        {
            icon: (
                <PhoneCall
                    size={60}
                    className="text-[var(--brand-color)] mb-6"
                />
            ),
            title: 'Call us',
            description: 'Mon-Fri from 8am to 5pm',
            contactInfo: '+84 0000 000 000',
        },
    ];

    return (
        <div className="w-full h-full">
            <GeneralBanner />
            <p className="font-semibold text-2xl mb-4">Contacts our team</p>
            <div className='flex flex-row [&>div[data-slot="Card"]]:bg-[var(--brand-black-bg)] [&>div[data-slot="Card"]]:px-8 [&>div[data-slot="Card"]]:py-10 [&>div[data-slot="Card"]]:rounded-2xl gap-2'>
                {contactCards.map((card, index) => (
                    <div
                        key={index}
                        data-slot="Card"
                        className="flex basis-1/4 flex-col justify-center gap-2"
                    >
                        {card.icon}
                        <p className={`font-bold ${index === 0 ? '' : ''}`}>
                            {capitalizeWords(card.title)}
                        </p>
                        <p className="text-[var(--brand-grey-foreground)]">
                            {card.description}
                        </p>
                        {card.isLink ? (
                            <p className={'font-bold'}>{card.contactInfo}</p>
                        ) : (
                            <p className={'font-bold'}>{card.contactInfo}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
