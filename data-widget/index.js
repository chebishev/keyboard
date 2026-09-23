import {
  createWidget,
  widget,
  keyboard,
  prop,
} from '@zos/ui'
import { styles } from "zosLoader:./index.[pf].layout.js";

let shiftWidget = null;
// Flag for pressed Shift button
let shiftEnabled = false;
// References to all letter widgets
const letterWidgets = [];

function updateKeyboardCase() {
  letterWidgets.forEach((key) => {
    key.widget.setProperty(
      prop.TEXT,
      shiftEnabled ? key.letter.toUpperCase() : key.letter
    )
  })
}

function updateShiftButton() {
  shiftWidget.setProperty(prop.MORE, {
    x: 15,
    y: 340,
    w: 50,
    h: styles.keyHeight,
    text: shiftEnabled ? '⬆' : '⇧',
    // color: shiftEnabled ? 0x00ff00 : 0xffffff,
    normal_color: 0x000000,
    press_color: 0x000000,
  })
}

DataWidget({
  onInit() {
    console.log('BG keyboard: onInit')

    //test keyboard properties (to be removed)
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

    // shift button placed on the left of the third row
    shiftWidget = createWidget(widget.BUTTON, {
      x: 15,
      y: 340,
      w: 50,
      h: styles.keyHeight,
      text: '⇧',
      normal_color: 0x000000,
      press_color: 0x000000,


      click_func: () => {
        shiftEnabled = !shiftEnabled;
        updateShiftButton();
        updateKeyboardCase();

        console.log('Shift:', shiftEnabled)
      },
    })

    const rows = [
      ['я', 'в', 'е', 'р', 'т', 'ъ', 'у', 'и', 'о', 'п', 'ч'],
      ['а', 'с', 'д', 'ф', 'г', 'х', 'й', 'к', 'л', 'ш', 'щ'],
      ['з', 'ь', 'ц', 'ж', 'б', 'н', 'м', 'ю'],
    ]

    rows.forEach((row, rowIndex) => {
      row.forEach((letter, keyIndex) => {
        const keyWidget = createWidget(widget.BUTTON, {
          x: styles.rows[rowIndex].x + keyIndex * styles.keyWidth,
          y: styles.rows[rowIndex].y,
          w: styles.keyWidth,
          h: styles.keyHeight,
          text: letter,
          normal_color: 0x000000,
          press_color: 0x000000,

          click_func: () => {
            const output = shiftEnabled ? letter.toUpperCase() : letter;

            keyboard.inputText(output)
          },
        })
        letterWidgets.push({
          widget: keyWidget,
          letter: letter,
        })
      })
    })
  },

  onDestroy() {
    console.log('BG keyboard: onDestroy')
  },
})