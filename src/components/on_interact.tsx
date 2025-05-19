import styled from 'styled-components';

export const RevealOnHover = styled.div`
  opacity: 0;
  transition: opacity 0.3s ease-in-out; /* Tailwind's duration-300 and a common ease */

  &:hover {
    opacity: 1;
  }
`;