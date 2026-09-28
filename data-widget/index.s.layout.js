import { keyboard } from '@zos/ui';
import { getDeviceInfo } from '@zos/device';
import { px } from '@zos/utils';

const { h } = keyboard.getContentRect();
const { width: DEVICE_WIDTH } = getDeviceInfo();
const keyboardButtonColor = 0x000000;

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
      top: 10,
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
      height: "13vh",
      column_gap: "2",
    },
  },

  keyButton: {
    radius: 10,
    normal_color: 0xff0000,
    press_color: keyboardButtonColor,
    layout: {
      height: "100%",
      width: "8.5%",
      font_size: "40",
    },
  },

  deleteKey: {
    x: DEVICE_WIDTH - px(70),
    y: h - px(56),
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
      width: "26",
      height: "26",
    },
  },

  actionKeyContainer: {
    layout: {
      width: "25%",
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