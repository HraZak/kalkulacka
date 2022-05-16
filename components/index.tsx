import styled from 'styled-components';

export const DivLayout = styled.div``;

export const DivGrid = styled.div`
  display: grid;

  padding: 5px;

  width: 200px;
  height: 300px;

  background-color: darkblue;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);

  grid-template-areas:
    'display display display display'
    'ac ac del deleno'
    'sedm osm devet krat'
    'ctyri pet sest plus'
    'jedna dva tri minus'
    'tecka nula rovno rovno';

  gap: 5px;
`;

export const DivButton = styled.button<{ pozice: string }>`
  grid-area: ${(props) => props.pozice};
  cursor: pointer;
`;

export const DivDisplay = styled.div``;
