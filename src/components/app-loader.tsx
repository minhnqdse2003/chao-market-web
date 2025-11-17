import '@/styles/_loading-bouncing.scss';

export default function AppLoader() {
    return (
        <div
            className={
                'w-fit mx-auto h-full min-h-svh flex justify-center items-center animate-pulse flex-col gap-4' +
                ' pulse-scale'
            }
        >
            <img
                src="/img/brand-logo.svg"
                className="w-full uppercase h-auto max-w-[24rem]"
                alt={'Brand-logo'}
            />
            <p
                className={
                    'text-3xl text-brand-text dark:text-[var(--brand-color)] flex gap-2'
                }
            >
                Chào Market
                <span className="text-animation">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </p>
        </div>
    );
}
