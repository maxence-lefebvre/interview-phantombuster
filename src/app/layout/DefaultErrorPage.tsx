import { useRouteError } from 'react-router-dom';
import { z } from 'zod';

export function DefaultErrorPage() {
  const error = z
    .object({
      statusText: z.string().optional(),
      message: z.string().optional(),
    })
    .parse(useRouteError());

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <h1 className="text-6xl">Oops!</h1>
      <p className="text-3xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Details: {error.statusText || error.message}</i>
      </p>
    </div>
  );
}
