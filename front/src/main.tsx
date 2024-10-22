import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.tsx'
import './app/index.scss'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
<BrowserRouter>

  <Provider store={store}> 
  <App />
  </Provider>

		
	</BrowserRouter>
  </StrictMode>,
)
