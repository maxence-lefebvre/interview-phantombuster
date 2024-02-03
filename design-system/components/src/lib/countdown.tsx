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

  return <span>{countdown}</span>;
};
