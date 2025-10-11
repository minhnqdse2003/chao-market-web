import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { ReactNode } from 'react';

const AppTooltips = ({
    contents,
    trigger,
}: {
    contents: ReactNode;
    trigger: ReactNode;
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                <TooltipContent className="bg-[var(--brand-grey)] [&>span>svg]:bg-[var(--brand-grey)] [&>span>svg]:fill-[var(--brand-grey)] text-brand-text dark:bg-brand-dialog dark:[&>span>svg]:bg-brand-dialog dark:[&>span>svg]:fill-brand-dialog ">
                    {contents}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AppTooltips;
