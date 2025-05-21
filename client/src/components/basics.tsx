import styled from 'styled-components';

export const SizedBox = styled.div<{ $width?: number | string, $height?: number | string; }>`
    width: ${props => props.$width ?? 0};
    height: ${props => props.$height ?? 0};
`;

export const Spacer = styled.div`
    flex: 999999;
`;

export const DocHeader1 = styled.h1`
    font-size: 3rem;
    font-family: "Monsterrat";
    margin-bottom: 2.5rem;
    line-height: 1.2;
    font-weight: 600;
`;

export const DocHeader2 = styled.h2`
    font-size: 2.6rem;
    font-family: "Monsterrat";
    margin-bottom: 2rem;
    margin-top: 2rem;
    font-weight: 500;
`;

export const DocHeader3 = styled.h3`
    font-size: 2.4rem;
    font-family: "Monsterrat";
    margin-bottom: 2rem;
    margin-top: 2rem;
    font-weight: 500;
`;

