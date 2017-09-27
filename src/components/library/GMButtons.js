import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${props => (props.selected ? "lightgray" : "white")};
  box-sizing: border-box;
  user-select: none;
  font-weight: 600;
  font-size: 14px;
  border-width: 1px;
  line-height: 1.4;
  border-style: solid;
  text-transform: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
`;

export const RoundedLeft = StyledButton.extend`
  border: 1px solid;
  border-color: #d6d7db;
  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  padding-left: 20px;
  padding-right: 20px;
`;

export const RoundedRight = StyledButton.extend`
  border: 1px solid;
  border-color: #d6d7db;
  border-top-right-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  padding-left: 20px;
  padding-right: 20px;
`;

export const SecondaryText = styled.span`
  margin-left: 5px;
  margin-top: 3px;
  opacity: 0.6;
  font-size: 12px;
`;
