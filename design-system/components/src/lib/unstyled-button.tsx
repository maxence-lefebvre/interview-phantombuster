import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';

export type UnstyledButtonProps = HTMLAttributes<HTMLButtonElement>;

export const UnstyledButton = ({ children, ...props }: UnstyledButtonProps) => {
  return (
    <button
      css={css`
        all: unset;
      `}
      {...props}
    >
      {children}
    </button>
  );
};
