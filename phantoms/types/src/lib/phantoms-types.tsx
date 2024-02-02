import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface PhantomsTypesProps {}

const StyledPhantomsTypes = styled.div`
  color: pink;
`;

export function PhantomsTypes(props: PhantomsTypesProps) {
  return (
    <StyledPhantomsTypes>
      <h1>Welcome to PhantomsTypes!</h1>
    </StyledPhantomsTypes>
  );
}

export default PhantomsTypes;
