import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface PhantomsStateProps {}

const StyledPhantomsState = styled.div`
  color: pink;
`;

export function PhantomsState(props: PhantomsStateProps) {
  return (
    <StyledPhantomsState>
      <h1>Welcome to PhantomsState!</h1>
    </StyledPhantomsState>
  );
}

export default PhantomsState;
