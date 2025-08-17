/**
 * Reduces the font size of the provided text element until its width is less than the provided container element's width.
 * @param containerElement The container element to fit the text element within.
 * @param textElement The text element to strink.
 */
export const shrinkTextToFitContainer = (containerElement, textElement) => {
  if (containerElement && textElement) {
    let size = parseInt(
      getComputedStyle(textElement).getPropertyValue("font-size"),
    );

    const parent_width = parseInt(
      getComputedStyle(containerElement).getPropertyValue("width"),
    );

    while (textElement.offsetWidth > parent_width) {
      size -= 1;
      textElement.style.fontSize = size + "px";
    }
  }
};
