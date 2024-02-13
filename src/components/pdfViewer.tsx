import React, { useState, useRef } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);

  const { pdfDocument, pdfPage } = usePdf({
    file: "test.pdf",
    page,
    canvasRef,
    scale: scale,
  });

  return (
    <div>
      {!pdfDocument && <span>Loading...</span>}
      <TransformWrapper
        wheel={{
          disabled: true,
        }}
        doubleClick={{
          mode: "toggle",
        }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                // border: "1px solid black",
              }}
            >
              <div
                style={{
                  height: "70vh",
                  // width: "30vh",
                  // border: "1px solid black",
                }}
              >
                <TransformComponent
                  wrapperStyle={{
                    height: "100%",
                    width: "100%",
                    border: "1px solid black",
                  }}
                  contentStyle={{ height: "100%", width: "100%" }}
                >
                  <canvas
                    ref={canvasRef}
                    style={{
                      height: "100%",
                      //   border: "1px solid black",
                    }}
                  />
                </TransformComponent>
              </div>
            </div>
            {Boolean(pdfDocument && pdfDocument.numPages) && (
              <nav>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </button>

                <button
                  disabled={page === pdfDocument?.numPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>

                <button onClick={() => zoomIn()}>Zoom In</button>
                <button onClick={() => zoomOut()}>Zoom Out</button>
              </nav>
            )}
          </>
        )}
      </TransformWrapper>
    </div>
  );
};
export default MyPdfViewer;
