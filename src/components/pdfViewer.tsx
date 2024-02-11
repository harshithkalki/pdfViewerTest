import React, { useState, useRef } from "react";
import { usePdf } from "@mikecousins/react-pdf";

const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: "test.pdf",
    page,
    canvasRef,
  });

  return (
    <div>
      {!pdfDocument && <span>Loading...</span>}
      <div
        style={{
          height: "60vh",
          //   border: "1px solid black",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            height: "100%",
            border: "1px solid black",
          }}
        />
      </div>
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul className="pager">
            <li className="previous">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>
            <li className="next">
              <button
                disabled={page === pdfDocument?.numPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
export default MyPdfViewer;
