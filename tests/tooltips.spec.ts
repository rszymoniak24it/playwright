import { test } from '@playwright/test';
import { ToolTipsPage } from '../pages/TooltipsPage';

test('Verify tooltips appear with correct text', async ({ page }) => {
  const toolTipsPage = new ToolTipsPage(page);
  await toolTipsPage.goto();

  await toolTipsPage.hoverAndCheckTooltip(toolTipsPage.buttonHover, 'You hovered over the Button');
  await toolTipsPage.hoverAndCheckTooltip(toolTipsPage.textFieldHover, 'You hovered over the text field');
  await toolTipsPage.hoverAndCheckTooltip(toolTipsPage.linkHover, 'You hovered over the Contrary');
});
