import { useEffect, useMemo, useState } from 'react';

const calculateTimeLeft = (target: Date) => {
  return Math.max(0, target.valueOf() - Date.now());
};

const parseTimeLeft = (timeLeft: number) => {
  return {
    days: Math.floor(timeLeft / 86400000),
    hours: Math.floor(timeLeft / 3600000) % 24,
    minutes: Math.floor(timeLeft / 60000) % 60,
    seconds: Math.floor(timeLeft / 1000) % 60,
    milliseconds: Math.floor(timeLeft) % 1000,
  };
};

export const useCountdown = (target: Date) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const parsedTimeLeft = useMemo(() => parseTimeLeft(timeLeft), [timeLeft]);

  return [parsedTimeLeft, timeLeft] as const;
};
