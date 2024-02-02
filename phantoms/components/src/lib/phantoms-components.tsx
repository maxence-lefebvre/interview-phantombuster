import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface PhantomsComponentsProps {}

const StyledPhantomsComponents = styled.div`
  color: pink;
`;

export function PhantomsComponents(props: PhantomsComponentsProps) {
  return (
    <StyledPhantomsComponents>
      <h1>Welcome to PhantomsComponents!</h1>
    </StyledPhantomsComponents>
  );
}
