import { Countdown, Skeleton } from '@phantombuster/design-system/components';
import { usePhantoms } from '@phantombuster/phantoms/state';
import { getNextLaunchDate } from '@phantombuster/phantoms/types';

export function NextPhantomLaunchIn() {
  const { data: phantoms, isLoading } = usePhantoms();

  if (isLoading || !phantoms) {
    return <Skeleton className="h-4 w-[250px]" />;
  }

  const nextLaunchIn = Math.min(
    ...phantoms.map((phantom) => phantom.nextLaunchIn).filter(Boolean)
  );

  if (nextLaunchIn === Infinity) {
    return <span className="text-sm font-medium text-gray-500">Idle</span>;
  }

  const nextLaunchDate = getNextLaunchDate(nextLaunchIn);

  return (
    <span className="text-sm font-medium text-gray-500">
      Next launch: <Countdown targetDate={nextLaunchDate} />
    </span>
  );
}
