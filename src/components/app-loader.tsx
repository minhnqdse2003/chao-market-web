import '@/styles/_loading-bouncing.scss';
import { T } from './app-translate';

export default function AppLoader() {
    return (
        <div
            className={
                'w-fit mx-auto h-full max-h-[calc(100%-8rem)] lg:max-h-full lg:min-h-svh flex justify-center' +
                ' items-center' +
                ' animate-pulse gap-4' +
                ' pulse-scale'
            }
        >
            <img
                src="/img/brand-logo.svg"
                className="w-full uppercase h-auto max-w-[3rem] lg:max-w-[24rem]"
                alt={'Brand-logo'}
            />
            <div className={'w-fit'}>
                <p
                    className={
                        'text-lg lg:text-2xl text-brand-text dark:text-[var(--brand-color)] font-semibold flex' +
                        ' whitespace-nowrap gap-2'
                    }
                >
                    Chào Market
                    <span className="text-animation">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                </p>
                <span className={'text-sm lg:text-base whitespace-nowrap'}>
                    <T keyName={'sidebar.brandGoal'} />
                </span>
            </div>
        </div>
    );
}
