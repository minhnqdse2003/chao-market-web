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
                <TooltipContent className="bg-brand-dialog [&>span>svg]:bg-brand-dialog [&>span>svg]:fill-brand-dialog text-white">
                    {contents}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AppTooltips;
