import { GeneralBanner } from '@/components/app-banner';
import { Headset, MapPin, MessageSquareMore, PhoneCall } from 'lucide-react';

export default function ContactsPage() {
    return (
        <div className="w-full">
            <GeneralBanner />
            <p className="font-semibold text-3xl mb-4">Contacts our team</p>
            <div className='flex flex-row [&>div[data-slot="Card"]]:bg-[var(--brand-black-bg)] [&>div[data-slot="Card"]]:px-8 [&>div[data-slot="Card"]]:py-10 [&>div[data-slot="Card"]]:rounded-2xl gap-2'>
                <div
                    data-slot="Card"
                    className="flex basis-1/3 flex-col justify-center gap-2"
                >
                    <MessageSquareMore
                        size={60}
                        className="text-[var(--brand-color)] mb-6"
                    />
                    <p className="uppercase font-bold">Chat to sales</p>
                    <p className="text-[var(--brand-grey-foreground)]">
                        Get better deal with our sales team
                    </p>
                    <p className="underline">sales@chaomarket.com</p>
                </div>
                <div
                    data-slot="Card"
                    className="flex basis-1/4 flex-col justify-center gap-2"
                >
                    <Headset
                        size={60}
                        className="text-[var(--brand-color)] mb-6"
                    />
                    <p className="uppercase font-bold">Chat to support</p>
                    <p className="text-[var(--brand-grey-foreground)]">
                        We’re here to help
                    </p>
                    <p className="underline">support@chaomarket.com</p>
                </div>
                <div
                    data-slot="Card"
                    className="flex basis-1/4 flex-col justify-center gap-2"
                >
                    <MapPin
                        size={60}
                        className="text-[var(--brand-color)] mb-6"
                    />
                    <p className="uppercase font-bold">Visit us</p>
                    <p className="text-[var(--brand-grey-foreground)]">
                        Visit out HQ
                    </p>
                    <p className="underline">View on Google Maps</p>
                </div>
                <div
                    data-slot="Card"
                    className="flex basis-1/4 flex-col justify-center gap-2"
                >
                    <PhoneCall
                        size={60}
                        className="text-[var(--brand-color)] mb-6"
                    />
                    <p className="uppercase font-bold">Call us</p>
                    <p className="text-[var(--brand-grey-foreground)]">
                        Mon-Fri from 8am to 5pm
                    </p>
                    <p className="underline">+84 0000 000 000 </p>
                </div>
            </div>
        </div>
    );
}
