import styled from "styled-components";

export const ProgressContainer = styled.div`
  height: 2rem;
  border: 1px solid var(--claro_linhas);
  background: var(--bg_btns_icones);
  border-radius: 9999px;
`;

export const Progress = styled.span<{ percentage: number; color?: string }>`
  display: block;
  border-radius: 9999px;
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background: ${({ color }) => color};
`;
