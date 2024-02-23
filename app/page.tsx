import React from "react";
import Update from "./update/page";

import PDFViewer2 from "./pdf-viewer2";
export default function Home() {
  return (
    <div>
      <h1>Viewing a PDF in Next.js</h1>
      <Update/>
      <PDFViewer2 pdfPath="./docc.pdf" />
    </div>
  );
}

//https://github.com/fazt/react-pdf-tutorial/blob/master/src/App.jsx