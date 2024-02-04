import { css } from '@emotion/react';
import { ComponentPropsWithoutRef } from 'react';

export type UnstyledButtonProps = ComponentPropsWithoutRef<'button'>;

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
