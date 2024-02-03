import { format } from 'date-fns';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

import { useCountdown } from './countdown/use-countdown';

export type CountdownProps = {
  targetDate: Date;
};

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [{ days, hours, minutes, seconds }] = useCountdown(targetDate);

  const countdown = [
    days && `${days}d`,
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    seconds && `${seconds}s`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span>{countdown}</span>
        </TooltipTrigger>
        <TooltipContent>{format(targetDate, 'Pp')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};