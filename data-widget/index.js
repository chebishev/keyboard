import {
  createWidget,
  widget,
  keyboard,
  prop,
} from '@zos/ui'
import { styles } from "zosLoader:./index.[pf].layout.js"

let shiftEnabled = false;
const letterWidgets = [];
let enterImage = null;
let deleteImage = null
let deleteButton = null

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

function updateEnterState() {
  const hasText = !!keyboard.getTextContext()

  if (enterImage) {
    enterImage.setProperty(
      prop.SRC,
      hasText
        ? "image/tick.png"
        : "image/shift.png"
    )
  }

  if (deleteImage) {
    deleteImage.setProperty(
      prop.VISIBLE,
      hasText
    )
  }

  if (deleteButton) {
    deleteButton.setProperty(
      prop.VISIBLE,
      hasText
    )
  }
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

    // Main container
    const vc = createWidget(widget.VIRTUAL_CONTAINER, {
      ...styles.container,
    })

    // Container holding all keyboard rows
    const keyboardWidget = createWidget(widget.VIRTUAL_CONTAINER, {
      parent: vc,
      ...styles.keyboard,
    })

    deleteButton = createWidget(widget.BUTTON, {
      parent: vc,

      x: 335,
      y: 20,
      w: 64,
      h: 64,

      click_func: () => {
        keyboard.sendFnKey(keyboard.BACKSPACE)
        updateEnterState()
      },
      longpress_func: () => {
        keyboard.clearInput()
        updateEnterState()
      },
    })

    deleteButton.setAlpha(0)

    deleteImage = createWidget(widget.IMG, {
      parent: vc,
      src: "image/del.png",
      enable: false,

      x: 335,
      y: 20,
      w: 64,
      h: 64,
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
            updateEnterState()
          },
        })
        letterWidgets.push({
          widget: letterWidget,
          letter: letter,
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
      {
        src: "image/globe.png",
        action: () => {
          // change language
          keyboard.sendFnKey(keyboard.SWITCH)
        },
        longpress_func: () => {
          // open additional input methods and settings
          keyboard.sendFnKey(keyboard.SELECT)
        },
      },
      {
        src: "image/space.png", action: () => {
          keyboard.inputText(" ")
          updateEnterState()
        }

      },
      {
        type: "enter",
        src: "image/tick.png",
        action: () => {
          if (keyboard.getTextContext()) {
            keyboard.sendFnKey(keyboard.ENTER)
          } else {
            keyboard.sendFnKey(keyboard.CANCEL)
          }
        }
      },
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
        longpress_func: key.longpress_func,
      })

      btn.setAlpha(0)

      const img = createWidget(widget.IMG, {
        parent: keyContainer,
        src: key.src,
        enable: false,
        layout: {
          width: "64",
          height: "64",
        },
      })

      if (key.type === "enter") {
        enterImage = img;
      }
    })
    updateEnterState()
  },

  onDestroy() {
    console.log('BG keyboard: onDestroy')
  },
})