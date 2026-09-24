import {
  createWidget,
  widget,
  keyboard,
} from '@zos/ui'

import { styles } from "zosLoader:./index.[pf].layout.js"

DataWidget({
  onInit() {
    console.log('BG keyboard: onInit')

    // Temporary test - we'll remove it later
    const rect = keyboard.getContentRect()
    console.log(
      'content rect:',
      rect.x,
      rect.y,
      rect.w,
      rect.h
    )
  },

  build() {
    console.log('BG keyboard: build')
    createWidget(widget.CIRCLE, {
      center_x: 240,
      center_y: 240,
      radius: 240,
      color: 0xfc6950,
      alpha: 200
    })

    // Main container
    const vc = createWidget(widget.VIRTUAL_CONTAINER, {
      ...styles.container,
    })

    // Container holding all keyboard rows
    const keyboardWidget = createWidget(widget.VIRTUAL_CONTAINER, {
      parent: vc,
      ...styles.keyboard,
    })

    const rows = [
      ['я', 'в', 'е', 'р', 'т', 'ъ', 'у', 'и', 'о', 'п', 'ч'],
      ['а', 'с', 'д', 'ф', 'г', 'х', 'й', 'к', 'л', 'ш', 'щ'],
      ['з', 'ь', 'ц', 'ж', 'б', 'н', 'м', 'ю'],
    ]

    rows.forEach((row) => {
      // Each array becomes its own flex row
      const rowWidget = createWidget(widget.VIRTUAL_CONTAINER, {
        parent: keyboardWidget,
        ...styles.keyboardRow,
      })

      row.forEach((letter) => {
        createWidget(widget.BUTTON, {
          parent: rowWidget,
          ...styles.keyButton,

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