/**
 * Reduces the font size of the provided text element until its width is less than the provided container element's width.
 * If the text element is not overflowing, it will set the font size of the text element as close to the target font size as it can
 * without overflowing.
 * @param containerElement The container element to fit the text element within.
 * @param textElement The text element to strink.
 * @param targetFontSize the font size to try to maintain in pixels
 */
export const shrinkTextToFitContainer = (
  containerElement,
  textElement,
  targetFontSize,
) => {
  if (containerElement && textElement) {
    const parent_width = parseInt(
      getComputedStyle(containerElement).getPropertyValue("width"),
    );

    if (textElement.offsetWidth <= parent_width) {
      textElement.style.fontSize = targetFontSize + "px";
    }

    let size = parseInt(
      getComputedStyle(textElement).getPropertyValue("font-size"),
    );

    while (textElement.offsetWidth > parent_width) {
      size -= 1;
      textElement.style.fontSize = size + "px";
    }
  }
};
