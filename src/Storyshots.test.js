import initStoryshots from "@storybook/addon-storyshots";

import { renderWithIntl } from "utils/i18nTesting";
import toJSON from "enzyme-to-json";

// Provide a custom test function to render
// components with necessary react-intl context
initStoryshots({
  test: ({ story, context }) => {
    const storyElement = story.render(context);
    const shallowTree = renderWithIntl(storyElement);
    expect(toJSON(shallowTree)).toMatchSnapshot();
  }
});
