# Contributing to Grey Matter Fabric Dashboard

The following is a set of guidelines for contributing to the dashboard.

**Table of Contents**

[styled-components](#styled-components)

## styled-components
1. Try to keep props general and theme-oriented. If you find yourself adding a prop to a styled component to render a very specific CSS property (e.g., just to add padding or margin, etc), don’t
2. Instead, add the style inline, or if it is more than 1 or 2 properties, extend the styled-component
3. Document props that you do add
4. Avoid nested ternaries within styled-components. If you need to do this, it probably means you should `extend`.
