export const isDesktopViewport = (page) => {
  const size = page.viewportSize();
  return size.width >= 600;
};
// returns true if desktop
// returns false if mobile
