import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Profiler } from 'react';
function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) {
  console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Profiler id="root" onRender={onRender}>
        <App />
      </Profiler>
    </BrowserRouter>
  </StrictMode>,
);
