import { keyboard } from '@zos/ui'

const { h } = keyboard.getContentRect()

export const styles = {
  container: {
    layout: {
      display: "flex",
      flex_flow: "column wrap",
      justify_content: "start",
      align_items: "center",
      align_content: "center",
      top: h + "",
      width: "100vw",
      height: "100vh",
    },
  },

  keyboard: {
    layout: {
      display: "flex",
      flex_flow: "column",
      gap: "10",
      width: "100%",
      flex_grow: "1",
    },
  },

  keyboardRow: {
    layout: {
      display: "flex",
      flex_flow: "row wrap",
      justify_content: "center",
      align_items: "center",
      align_content: "center",
      width: "100%",
      height: "12vh",
      column_gap: "2",
    },
  },

  keyButton: {
    radius: 10,
    normal_color: 0x000000,
    press_color: 0x000000,
    layout: {
      height: "100%",
      width: "8%",
      font_size: "40",
    },
  },
}