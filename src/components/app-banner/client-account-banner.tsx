export default function ClientAccountBanner() {
    return (
        <div className="w-full max-h-[14svh] dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)] py-8 rounded-2xl mb-4 flex items-center justify-center">
            <p className="text-center text-3xl italic text-[var(--brand-grey-foreground)]">
                “We don’t focus on maximising your profit. <br />
                We prioritise helping you manage market risks.”
            </p>
        </div>
    );
}
