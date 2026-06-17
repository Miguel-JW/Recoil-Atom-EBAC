import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App.jsx'
import './index.css'

// RecoilRoot precisa envolver toda a árvore que vai usar átomos/seletores.
// É colocado aqui, no ponto de entrada, para que qualquer componente da
// aplicação tenha acesso ao estado global gerenciado pelo Recoil.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
