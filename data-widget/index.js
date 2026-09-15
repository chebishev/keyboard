import {
  createWidget,
  widget,
  keyboard,
} from '@zos/ui'

import { styles } from "zosLoader:./index.[pf].layout.js";


DataWidget({
  onInit() {
    console.log('BG keyboard: onInit')
  },

  build() {
    console.log('BG keyboard: build')

    const rows = [
      ['я', 'в', 'е', 'р', 'т', 'ъ', 'у', 'и', 'о', 'п', 'ч'],
      ['а', 'с', 'д', 'ф', 'г', 'х', 'й', 'к', 'л', 'ш', 'щ'],
    ]

    rows.forEach((row, rowIndex) => {
      row.forEach((letter, keyIndex) => {
        createWidget(widget.BUTTON, {
          x: styles.rows[rowIndex].x + keyIndex * styles.keyWidth,
          y: styles.rows[rowIndex].y,
          w: styles.keyWidth,
          h: styles.keyHeight,
          text: letter,

          click_func: () => {
            keyboard.inputText(letter)
          },
        })
      })
    })
  },

  onDestroy() {
    console.log('BG keyboard: onDestroy')
  },
})