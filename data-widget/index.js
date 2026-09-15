import {
  createWidget,
  widget,
  keyboard,
} from '@zos/ui'

DataWidget({
  onInit() {
    console.log('BG keyboard: onInit')
  },

  build() {
    console.log('BG keyboard: build')

    createWidget(widget.BUTTON, {
      x: 200,
      y: 250,
      w: 80,
      h: 60,
      text: 'а',

      click_func: () => {
        console.log('Pressed: а')
        keyboard.inputText('а')
      },
    })
  },

  onDestroy() {
    console.log('BG keyboard: onDestroy')
  },
})