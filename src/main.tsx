import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { EnochianAnalysisContextProvider } from './contexts/enochianWatchtowerAnalysis.context.tsx'
import { EnochianDataContextProvider } from './contexts/enochianData.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EnochianAnalysisContextProvider>
    <EnochianDataContextProvider>
      <App />
    </EnochianDataContextProvider>
    </EnochianAnalysisContextProvider>
  </React.StrictMode>
)
