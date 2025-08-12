import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserMultiFormatReader } from "@zxing/library";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

interface CodebarScannerProps {
  scannerEstaAtivo: boolean;
  setScannerEstaAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setCodigoLido: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CodebarScanner = (props: CodebarScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [cameraAllowed, setCameraAllowed] = useState(false);

  useEffect(() => {
    if (!props.scannerEstaAtivo) return;
    const codeReader = new BrowserMultiFormatReader();
    codeReader.decodeFromVideoDevice('', videoRef.current!, (res, err) => {
      if (videoRef.current && videoRef.current.srcObject) {
        setCameraAllowed(true);
      }
      if (res) {
        console.log("Código reconhecido:", res.getText());
        setResult(res.getText());
        props.setCodigoLido(res.getText());
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
    <Container style={{ position: "relative" }}>
      <video ref={videoRef} style={{ width: 900, height: 600, background: "#000" }} />
      {!cameraAllowed && (
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 0,
            width: 640,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            background: "rgba(0,0,0,0.5)",
            fontSize: "2rem",
            pointerEvents: "none",
            textAlign: "center"
          }}
        >
          📷 Este aplicativo precisa acessar sua câmera para ler o código de barras. Por favor, autorize o acesso quando solicitado.
        </div>
      )}
      {result && <div>Resultado: {result}</div>}
    </Container>
  );
};