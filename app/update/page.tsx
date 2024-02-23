"use client";
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Update = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState(1);
  const [showPdf, setShowPdf] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <button
        onClick={() => setShowPdf(!showPdf)}
        className="bg-blue-500 text-white px-4 py-2 z-40 mt-5 mb-5 rounded hover:bg-blue-600"
      >
        {showPdf ? "Hide PDF" : "Show PDF"}
      </button>

      {showPdf && (
        <div className="p-14 bg-slate-500">
          <div className="fixed lg:top-32 lg:left-1/3 lg:right-1/3 top-0 left-0 right-0  p-4 z-10">
            <div className="flex justify-between items-center">
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <div className="flex items-center space-x-4">
                <span
                  className="text-2xl cursor-pointer"
                  onClick={() => setScale(Math.min(2, scale + 0.1))}
                >
                  +
                </span>
                <span
                  className="text-3xl cursor-pointer"
                  onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                >
                  -
                </span>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Document file="https://pdfobject.com/pdf/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => (
                  <Page
                    key={page}
                    pageNumber={page}
                    renderTextLayer={false}
                    width={600 * scale}
                    renderAnnotationLayer={false}
                  />
                ))}
            </Document>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;
