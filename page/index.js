import { createKeyboard, inputType, deleteKeyboard } from '@zos/ui'

Page({
  build() {
    createKeyboard({
      inputType: inputType.JSKB,
      text: 'Имало едно време',
    })
  },

  onDestroy() {
    deleteKeyboard()
  },
})