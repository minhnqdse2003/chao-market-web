import TickerTape from '@/app/(user-layout)/market-data/components/ticker-tape';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={'min-h-svh'}>
            <TickerTape />
            {children}
        </div>
    );
}
