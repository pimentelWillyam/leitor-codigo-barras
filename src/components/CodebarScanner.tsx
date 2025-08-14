import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library";
import React from "react";
// import { IsMobile } from "../helpers/IsMobile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

interface CodebarScannerProps {
  scannerEstaAtivo: boolean;
  setScannerEstaAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setCodigoLido: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CodebarScanner = (props: CodebarScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraAllowed, setCameraAllowed] = useState(false)
  useEffect(() => {
      // if (!IsMobile.execute(navigator.userAgent)) return
      if (!props.scannerEstaAtivo) return
      const hints = new Map();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.CODE_128]);

    const codeReader = new BrowserMultiFormatReader(hints);
    codeReader.decodeFromVideoDevice('', videoRef.current!, (res, err) => {
      if (videoRef.current && videoRef.current.srcObject) {
        setCameraAllowed(true);
      }
      if (res) {
        console.log("Código reconhecido:", res.getText());
        console.log('formato:', res.getBarcodeFormat())
        props.setCodigoLido(res.getText());
        props.setCodigoLido(res.getText() + " - " + res.getBarcodeFormat().toString());

        props.setScannerEstaAtivo(false);
      }
      if (err && err.name !== "NotFoundException") {
        console.error(err);
      }
    });
    return () => codeReader.reset();
  }, [props, props.scannerEstaAtivo]);

  if (!props.scannerEstaAtivo) return null;

  return (
    <Container>
      <video
        ref={videoRef}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          background: "#000",
        }}
      />
      {!cameraAllowed && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "70vw",
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            background: "rgba(0,0,0,0.5)",
            fontSize: "1.3rem",
            pointerEvents: "none",
            textAlign: "center",
            padding: "16px",
          }}
        >
          Este aplicativo precisa acessar sua câmera para ler o código de barras. Por favor, autorize o acesso quando solicitado.
        </div>
      )}
    </Container>
  );
};