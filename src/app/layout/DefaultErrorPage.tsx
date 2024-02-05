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
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
