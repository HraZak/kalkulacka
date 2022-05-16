import styled from 'styled-components';

export const DivLayout = styled.div`
  background-color: #003f8b;

  min-width: 100vw;
  min-height: 100vh;
`;

export const DivGrid = styled.div`
  display: grid;
  margin: 0 auto;

  max-width: 80vw;
  max-height: 80vh;
  aspect-ratio: 2/3;

  background-color: #fff;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);

  grid-template-areas:
    'display display display display'
    'ac ac del deleno'
    'sedm osm devet krat'
    'ctyri pet sest plus'
    'jedna dva tri minus'
    'tecka nula rovno rovno';

  gap: 2px;
  justify-content: center;
`;

export const DivButton = styled.button<{ pozice: string }>`
  background-color: #bfd2e4;
  grid-area: ${(props) => props.pozice};
  cursor: pointer;
  border: 0;

  &:hover {
    background-color: #e6edf5;
  }
`;

export const DivDisplay = styled.div`
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);

  background-color: #000;
  color: #fff;
  grid-area: display;
`;

export const DivDisplayCislo = styled.div``;

export const DivDisplayZadano = styled.div``;
