'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

function Progress({
    className,
    value,
    isValueVisible = false,
    ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
    isValueVisible?: boolean;
}) {
    return (
        <ProgressPrimitive.Root
            data-slot="progress"
            className={cn(
                'bg-primary/20 relative h-5 w-full overflow-hidden rounded-sm',
                className
            )}
            {...props}
        >
            {isValueVisible && value ? (
                <>
                    <ProgressPrimitive.Indicator
                        data-slot="progress-indicator"
                        className="bg-primary h-full w-full flex-1 transition-all"
                        style={{
                            transform: `translateX(-${100 - (value || 0)}%)`,
                        }}
                    />
                    <p
                        className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-black"
                        style={{ left: `${value / 2}%` }}
                    >
                        {`${value}%`}
                    </p>
                    <p
                        className="absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 text-black"
                        style={{ right: `${(100 - value) / 2}%` }}
                    >
                        {`${100 - value}%`}
                    </p>
                </>
            ) : (
                <ProgressPrimitive.Indicator
                    data-slot="progress-indicator"
                    className="bg-primary h-full w-full flex-1 transition-all"
                    style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
                />
            )}
        </ProgressPrimitive.Root>
    );
}

export { Progress };
