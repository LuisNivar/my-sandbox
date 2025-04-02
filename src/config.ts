import { $ } from "./utils";

export const EDITOR_LAYOUT_OPTIONS = {
  columnGutters: [
    {
      track: 1,
      element: $(".vertical-gutter") as HTMLDivElement,
    },
  ],
  rowGutters: [
    {
      track: 1,
      element: $(".horizontal-gutter") as HTMLDivElement,
    },
  ],
};

export const COMMONS_EDITOR_OPTIONS = {
  automaticLayout: true,
  minimap: {
    enabled: false,
  },
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,
  padding: {
    top: 16,
  },
  fontSize: 16,
  tabSize: 2,
  theme: "vs-dark",
};
