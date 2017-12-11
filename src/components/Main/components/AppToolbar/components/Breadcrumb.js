import styled from "styled-components";

const Breadcrumb = styled.li`
  align-items: center;
  color: black;
  display: flex;
  flex: 0 0 auto;
  &:before {
    content: ">";
    display: flex;
    opacity: 0.5;
    padding: 0 4px;
    transform: scaleX(0.5);
  }
  a {
    color: inherit;
    display: flex;
    max-width: 100%;
    padding: 8px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: black;
    }
  }
  &:first-child {
    &:before {
      content: none;
    }
    a {
      padding-left: 16px;
    }
  }
`;

export default Breadcrumb;
