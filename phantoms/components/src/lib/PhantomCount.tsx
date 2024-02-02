import { usePhantoms } from '@phantombuster/phantoms/state';

export const PhantomCount = () => {
  const { data: phantoms, isLoading } = usePhantoms();

  if (isLoading || !phantoms) {
    return (
      <span className="text-sm font-medium text-gray-500">Loading...</span>
    );
  }

  if (phantoms.length > 0) {
    return (
      <span className="text-sm font-medium text-gray-500">
        {phantoms.length} phantoms
      </span>
    );
  }

  // Invite the user to create their first Phantom
  return (
    <span className="text-sm font-medium text-gray-500">
      Start with your first Phantom!
    </span>
  );
};
