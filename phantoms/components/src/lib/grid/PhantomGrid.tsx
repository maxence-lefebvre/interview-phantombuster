import { Skeleton } from '@phantombuster/design-system/components';
import { usePhantoms } from '@phantombuster/phantoms/state';

import { PhantomCard } from '../PhantomCard';

export const PhantomGrid = () => {
  const { data: phantoms, isLoading } = usePhantoms();

  return (
    <section className="grid grid-flow-row-dense grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isLoading || !phantoms
        ? [0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[155px] w-[290px] rounded-xl" />
          ))
        : phantoms.map((phantom) => (
            <PhantomCard key={phantom.id} phantom={phantom} />
          ))}
    </section>
  );
};
