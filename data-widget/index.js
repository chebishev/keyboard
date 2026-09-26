import {
  createWidget,
  widget,
  keyboard,
  prop,
  event,
} from '@zos/ui'
import { styles } from "zosLoader:./index.[pf].layout.js"

let shiftEnabled = false;
const letterWidgets = [];
let shiftImage = null;
let enterImage = null;
let deleteImage = null;
let deleteButton = null;
let globeImage = null;

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
        ? "image/check.png"
        : "image/cancel.png"
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

function addImagePressEffect(button, image) {
  button.addEventListener(event.CLICK_DOWN, () => {
    image.setAlpha(182)
  })

  button.addEventListener(event.CLICK_UP, () => {
    image.setAlpha(255)
  })
}

function addLetterPressEffect(button) {
  button.addEventListener(event.CLICK_DOWN, () => {
    button.setProperty(prop.MORE, {
      ...styles.keyButton,
      color: 0xb6b6b6,
    })
  })

  button.addEventListener(event.CLICK_UP, () => {
    button.setProperty(prop.MORE, {
      ...styles.keyButton,
      color: 0xffffff,
    })
  })
}

DataWidget({
  onInit() {
    console.log('BG keyboard: onInit')
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

    deleteImage = createWidget(widget.IMG, {
      parent: vc,
      src: "image/delete.png",
      enable: false,

      x: 380,
      y: 100,
      w: 64,
      h: 64,
    })

    deleteButton = createWidget(widget.BUTTON, {
      parent: vc,

      x: 380,
      y: 100,
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

    addImagePressEffect(deleteButton, deleteImage)

    const rows = [
      ['я', 'в', 'е', 'р', 'т', 'ъ', 'у', 'и', 'о', 'п', 'ч'],
      ['а', 'с', 'д', 'ф', 'г', 'х', 'й', 'к', 'л', 'ш', 'щ'],
      ['з', 'ь', 'ц', 'ж', 'б', 'н', 'м', 'ю', '.'],
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

            // change shift icon for each press according to the state
            shiftImage.setProperty(
              prop.SRC,
              shiftEnabled
                ? "image/shift_on_caps.png"
                : "image/shift_on.png"
            )
          },
        })

        shiftButton.setAlpha(0)
        // show the arrow
        shiftImage = createWidget(widget.IMG, {
          parent: shiftContainer,
          src: "image/shift_on.png",
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

        addLetterPressEffect(letterWidget)

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
    // switch EN/BG, space, enter/cancel
    const actionKeys = [
      {
        type: "globe",
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
        src: "image/blank.png", action: () => {
          // add empty space to the text
          keyboard.inputText(" ")
          updateEnterState()
        }

      },
      {
        type: "enter",
        src: "image/check.png",
        action: () => {
          if (keyboard.getTextContext()) {
            // send the text to wherever is needed
            keyboard.sendFnKey(keyboard.ENTER)
          } else {
            // close the keyboard
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

      const img = createWidget(widget.IMG, {
        parent: keyContainer,
        src: key.src,
        enable: false,
        layout: {
          width: "64",
          height: "64",
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

      addImagePressEffect(btn, img)

      if (key.type === "globe") {
        globeImage = img
      }

      if (key.type === "enter") {
        enterImage = img
      }
    })
    updateEnterState()
  },
  onResume() {
    console.log("BG Resume:", keyboard.getTextContext())
    updateEnterState()
    // revert swich input image to original state
    if (globeImage) {
      globeImage.setAlpha(255)
    }
  },
  onDestroy() {
    console.log('BG keyboard: onDestroy')
  },
})