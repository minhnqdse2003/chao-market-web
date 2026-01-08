import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClassValue } from 'clsx';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <Input
                placeholder=" "
                className={cn(
                    'peer h-12 text-sm lg:text-base text-brand-text [&::-webkit-outer-spin-button]:appearance-none' +
                        ' [&::-webkit-inner-spin-button]:appearance-none font-medium' +
                        ' [-moz-appearance:textfield]',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = React.forwardRef<
    React.ElementRef<typeof Label>,
    React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
    return (
        <Label
            className={cn(
                'peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-0 z-10 origin-[0]' +
                    ' -translate-y-1/2 scale-75 transform dark:bg-sidebar bg-white px-2 text-xs lg:text-sm' +
                    ' text-[var(--brand-grey-foreground)]/50 font-semibold' +
                    ' duration-300' +
                    ' peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2' +
                    ' peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4' +
                    ' peer-focus:scale-75' +
                    ' peer-focus:px-2 dark:peer-focus:text-[var(--brand-color)] dark:peer-focus:w-fit' +
                    ' peer-focus:w-fit' +
                    ' dark:peer-placeholder-shown:w-[calc(100%-10px)] peer-placeholder-shown:w-[calc(100%-10px)]' +
                    ' peer-focus:text-black dark:bg-sidebar' +
                    ' rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4' +
                    ' cursor-text transition-all! pointer-events-none',
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
FloatingLabel.displayName = 'FloatingLabel';

type FloatingLabelInputProps = InputProps & {
    label?: string | React.ReactNode;
    containerClassName?: ClassValue;
};

const FloatingLabelInput = React.forwardRef<
    React.ElementRef<typeof FloatingInput>,
    FloatingLabelInputProps
>(({ id, containerClassName, label, ...props }, ref) => {
    return (
        <div className={cn('relative', containerClassName)}>
            <FloatingInput ref={ref} id={id} {...props} />
            <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
        </div>
    );
});
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingInput, FloatingLabel, FloatingLabelInput };
