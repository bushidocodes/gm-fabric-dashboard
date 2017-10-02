import { PropTypes } from "prop-types";
import React from "react";
import styled from "styled-components";

// styled components
const Container = styled.div`
  color: white;
  display: flex;
`;

const Box1 = styled.span`
  min-width: 75%;
  margin: 0 0 0 10px;
`;

const Box2 = styled.span`
  text-align: right;
  margin: 0 0 0 10px;
`;

SidebarContentSectionItem.propTypes = {
  docsLink: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
};

export default function SidebarContentSectionItem({
  docsLink,
  title,
  version
}) {
  return (
    <Container>
      <Box1>{title}</Box1>
      <Box2>{version}</Box2>
    </Container>
  );
}
