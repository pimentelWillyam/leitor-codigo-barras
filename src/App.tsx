import { useState } from 'react';
import './App.css'
import { CodebarScanner } from './components/CodebarScanner'
import { IsMobile } from './helpers/IsMobile';

function App() {

  const [scannerEstaAtivo, setScannerEstaAtivo] = useState(true);
  const [codigoLido, setCodigoLido] = useState<string | null>(null);
  console.log("is mobile:", IsMobile.execute(navigator.userAgent).toString());


  return (
    <div>
    <CodebarScanner scannerEstaAtivo={scannerEstaAtivo}  setScannerEstaAtivo={setScannerEstaAtivo} setCodigoLido={setCodigoLido} />
    <h1>{codigoLido}</h1>
    </div>
  )
}

export default App
