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
                <TooltipContent className="bg-gray-600 [&>span>svg]:bg-gray-600 [&>span>svg]:fill-gray-600 text-white">
                    {contents}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AppTooltips;
