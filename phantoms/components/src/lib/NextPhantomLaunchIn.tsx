import { Countdown } from '@phantombuster/design-system/components';
import { usePhantoms } from '@phantombuster/phantoms/state';
import { getNextLaunchDate } from '@phantombuster/phantoms/types';

export const NextPhantomLaunchIn = () => {
  const { data: phantoms, isLoading } = usePhantoms();

  if (isLoading || !phantoms) {
    return (
      <span className="text-sm font-medium text-gray-500">Loading...</span>
    );
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
      Next launch in <Countdown targetDate={nextLaunchDate} />
    </span>
  );
};
