import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface RatingProps {}

const StyledRating = styled.div`
  color: pink;
`;

export function Rating(props: RatingProps) {
  return (
    <StyledRating>
      <h1>Welcome to Rating!</h1>
    </StyledRating>
  );
}

export default Rating;
