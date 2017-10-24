import styled from "styled-components";

const Breadcrumb = styled.li`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  color: black;
  &:before {
    content: ">";
    transform: scaleX(0.5);
    display: flex;
    opacity: 0.5;
    padding: 0 4px;
  }
  a {
    display: flex;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 8px 0;
    color: inherit;
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
