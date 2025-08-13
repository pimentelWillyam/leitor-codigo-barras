import { useState } from 'react';
import './App.css'
import { CodebarScanner } from './components/CodebarScanner'

function App() {

  const [scannerEstaAtivo, setScannerEstaAtivo] = useState(true);
  const [codigoLido, setCodigoLido] = useState<string | null>(null);

  return (
    <div>
    <CodebarScanner scannerEstaAtivo={scannerEstaAtivo}  setScannerEstaAtivo={setScannerEstaAtivo} setCodigoLido={setCodigoLido} />
    <h1>{codigoLido}</h1>
    <h1>userAgent: {navigator.userAgent}</h1>
    </div>
  )
}

export default App
