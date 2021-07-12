// returns actual text width even if text width < elem.scrollWidth

import { FONT_FAMILY } from 'app/theme'

const getTextWidth = (
  elem: HTMLParagraphElement | HTMLSpanElement
): number | null => {
  const { textContent } = elem

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (context && textContent) {
    context.font = `${getComputedStyle(elem).fontSize} ${FONT_FAMILY}`
    return context.measureText(textContent).width
  }

  return null
}

export default getTextWidth
