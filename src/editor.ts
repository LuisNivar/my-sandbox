import { decode } from "js-base64";
import { createHtmlType } from "./type";

export const URL_SEPARATOR = "|";

export function createHtml({ html, css, js }: createHtmlType) {
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
         <script type="module">
          ${js}
        </script>
      </body>
    </html>
    `;
}

export function getDataFromURL() {
  const { pathname } = window.location;

  if (pathname.length <= 1) return { html: "", css: "", js: "" };

  const separator = encodeURI(URL_SEPARATOR);
  const [base64Html, base64Css, base64Js] = pathname.slice(1).split(separator);

  const html = decode(base64Html);
  const css = decode(base64Css);
  const js = decode(base64Js);

  return { html, css, js };
}
