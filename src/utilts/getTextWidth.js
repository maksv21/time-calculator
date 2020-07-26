import { FONT_STYLE } from '../constants';

export default elem => {
  // get actual text width even if text width < elem.scrollWidth
  const fontSize = parseInt(getComputedStyle(elem).fontSize);
  const elemText = elem.textContent;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = `${fontSize}px ${FONT_STYLE}`;

  return context.measureText(elemText).width;
};
