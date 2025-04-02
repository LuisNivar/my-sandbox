import { encode } from "js-base64";
import * as monaco from "monaco-editor";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import Split from "split-grid";
import { createHtml, getDataFromURL, URL_SEPARATOR } from "./editor";
import "./editorStyle.css";
import "./style.css";

import { COMMONS_EDITOR_OPTIONS, EDITOR_LAYOUT_OPTIONS } from "./config";
import { $ } from "./utils";

Split(EDITOR_LAYOUT_OPTIONS);

const $html = $("#html") as HTMLDivElement;
const $css = $("#css") as HTMLDivElement;
const $js = $("#js") as HTMLDivElement;
const $preview = $("#preview") as HTMLIFrameElement;

window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "css") return new CssWorker();
    if (label === "javascript") return new JsWorker();
    if (label === "html") return new HtmlWorker();
    return new EditorWorker();
  },
};

const htmlEditor = monaco.editor.create($html, {
  language: "html",
  lineNumbers: "off",
  wordWrap: "on",
  ...COMMONS_EDITOR_OPTIONS,
});

const cssEditor = monaco.editor.create($css, {
  language: "css",
  lineNumbers: "off",
  wordWrap: "on",
  ...COMMONS_EDITOR_OPTIONS,
});

const jsEditor = monaco.editor.create($js, {
  language: "javascript",
  lineNumbers: "off",
  wordWrap: "on",
  ...COMMONS_EDITOR_OPTIONS,
});

htmlEditor.onDidChangeModelContent(update);
cssEditor.onDidChangeModelContent(update);
jsEditor.onDidChangeModelContent(update);

function update() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const doc = createHtml({ html, css, js });

  const hashedCod = `${encode(html)}${URL_SEPARATOR}${encode(
    css
  )}${URL_SEPARATOR}${encode(js)}`;

  window.history.replaceState(null, "", `/${hashedCod}`);
  $preview.setAttribute("srcdoc", doc);
}

const { html, css, js } = getDataFromURL();

htmlEditor.setValue(html);
cssEditor.setValue(css);
jsEditor.setValue(js);

const doc = createHtml({ html, css, js });
$preview.setAttribute("srcdoc", doc);
