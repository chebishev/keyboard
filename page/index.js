import { createKeyboard, inputType, deleteKeyboard } from '@zos/ui'

Page({
  build() {
    createKeyboard({
      inputType: inputType.JSKB,
    })
  },

  onDestroy() {
    deleteKeyboard()
  },
})