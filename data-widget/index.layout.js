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
      gap: "24",
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
      height: "12.2vh",
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

  deleteKey: {
    x: 380,
    y: 102,
    w: 64,
    h: 64,
  },

  shiftContainer: {
    layout: {
      width: "8%",
      height: "100%",
      display: "flex",
      justify_content: "center",
      align_items: "center",
      align_content: "center",
    },
  },

  overlayButton: {
    layout: {
      width: "100%",
      height: "100%",
      tags: "ignore-layout",
    },
  },

  shiftImage: {
    layout: {
      width: "32",
      height: "32",
    },
  },

  actionKeyContainer: {
    layout: {
      width: "18%",
      height: "100%",
      display: "flex",
      justify_content: "center",
      align_items: "center",
      align_content: "center",
    },
  },

  actionImage: {
    layout: {
      width: "64",
      height: "64",
    },
  },
}