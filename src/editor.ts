import { createHtmlType } from "./type";
import { $ } from "./utils";
import { encode, decode } from "js-base64";

const URL_SEPARATOR = "|";

const $html = $("#html") as HTMLTextAreaElement;
const $css = $("#css") as HTMLTextAreaElement;
const $js = $("#js") as HTMLTextAreaElement;
const $preview = $("#preview") as HTMLIFrameElement;

$html.addEventListener("input", update);
$css.addEventListener("input", update);
$js.addEventListener("input", update);

function createHtml({ html, css, js }: createHtmlType) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
      </head>
      <style>
        ${css}
      </style>
      <body>
        ${html}
         <script>
          ${js}
        </script>
      </body>
    </html>
    `;
}

function update() {
  const html = $html.value;
  const css = $css.value;
  const js = $js.value;

  const doc = createHtml({ html, css, js });

  const hashedCod = `${encode(html)}${URL_SEPARATOR}${encode(
    css
  )}${URL_SEPARATOR}${encode(js)}`;

  window.history.replaceState(null, "", `/${hashedCod}`);
  $preview.setAttribute("srcdoc", doc);
}

export function initEditor() {
  const { pathname } = window.location;

  if (pathname.length <= 1) return;

  const separator = encodeURI(URL_SEPARATOR);
  const [base64Html, base64Css, base64Js] = pathname.slice(1).split(separator);

  const html = decode(base64Html);
  const css = decode(base64Css);
  const js = decode(base64Js);

  $html.value = html;
  $css.value = css;
  $js.value = js;

  const doc = createHtml({ html, css, js });
  $preview.setAttribute("srcdoc", doc);
}

export const editorConfigLayout = {
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
