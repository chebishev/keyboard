import {
  createWidget,
  widget,
  keyboard,
  prop,
} from '@zos/ui'
import { log } from '@zos/utils'
import { styles } from "zosLoader:./index.[pf].layout.js"

let shiftEnabled = false
const letterWidgets = []

function updateKeyboardCase() {
  letterWidgets.forEach((key) => {
    key.widget.setProperty(
      prop.TEXT,
      shiftEnabled
        ? key.letter.toUpperCase()
        : key.letter
    )
  })
}

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
    //background for more visibillity
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

    rows.forEach((row, rowIndex) => {
      // Each array becomes its own flex row
      const rowWidget = createWidget(widget.VIRTUAL_CONTAINER, {
        parent: keyboardWidget,
        ...styles.keyboardRow,
      })
      // on the third row
      if (rowIndex === 2) {
        // create the shift button before the keyboard letters
        const shiftContainer = createWidget(widget.VIRTUAL_CONTAINER, {
          parent: rowWidget,
          layout: {
            width: "8%",
            height: "100%",
            display: "flex",
            justify_content: "center",
            align_items: "center",
            align_content: "center",
          },
        })
        // invisible button over the arrow image
        const shiftButton = createWidget(widget.BUTTON, {
          parent: shiftContainer,

          layout: {
            width: "100%",
            height: "100%",
            tags: "ignore-layout",
          },

          click_func: () => {
            shiftEnabled = !shiftEnabled
            updateKeyboardCase()
          },
        })

        shiftButton.setAlpha(0)
        // show the arrow
        createWidget(widget.IMG, {
          parent: shiftContainer,
          src: "image/shift.png",
          enable: false,
          layout: {
            width: "32",
            height: "32",
          },
        })
      }
      row.forEach((letter) => {
        const letterWidget = createWidget(widget.BUTTON, {
          parent: rowWidget,
          ...styles.keyButton,
          text: letter,

          click_func: () => {
            const output = shiftEnabled
              ? letter.toUpperCase()
              : letter

            keyboard.inputText(output)
          },
        })
      })
    })
    const actionRow = createWidget(widget.VIRTUAL_CONTAINER, {
      parent: keyboardWidget,
      layout: {
        ...styles.keyboardRow.layout,
        justify_content: "center",
      },
    })

    const actionKeys = [
      { src: "image/globe.png", action: () => { } },
      { src: "image/space.png", action: () => keyboard.inputText(" ") },
      { src: "image/tick.png", action: () => { } },
    ]

    actionKeys.forEach((key) => {
      const keyContainer = createWidget(widget.VIRTUAL_CONTAINER, {
        parent: actionRow,
        layout: {
          width: "18%",
          height: "100%",
          display: "flex",
          justify_content: "center",
          align_items: "center",
          align_content: "center",
        },
      })

      const btn = createWidget(widget.BUTTON, {
        parent: keyContainer,
        layout: {
          width: "100%",
          height: "100%",
          tags: "ignore-layout",
        },
        click_func: key.action,
      })

      btn.setAlpha(0)

      createWidget(widget.IMG, {
        parent: keyContainer,
        src: key.src,
        enable: false,
        layout: {
          width: "64",
          height: "64",
        },
      })
    })
  },

  onDestroy() {
    console.log('BG keyboard: onDestroy')
  },
})