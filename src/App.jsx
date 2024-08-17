import './App.css';
import Header from './components/Header';
function App() {
  return (
    <>
      <Header />
      <header>
        <div id="menu">
          <div id="logo"></div>
        </div>
      </header>
      <div id="colors">
        <div className="size-4 bg-primary-content"></div>
        <div className="size-4 bg-primary"></div>
        <div>---</div>
        <div className="size-4 bg-secondary-content"></div>
        <div className="size-4 bg-secondary"></div>
        <div>---</div>
        <div className="size-4 bg-accent-content"></div>
        <div className="size-4 bg-accent"></div>
        <div>---</div>
        <div className="size-4 bg-neutral-content"></div>
        <div className="size-4 bg-neutral"></div>
        <div>---</div>
        <div className="size-4 bg-base-content"></div>
        <div className="size-4 bg-base-100"></div>
        <div className="size-4 bg-base-200"></div>
        <div className="size-4 bg-base-300"></div>
        <div>---</div>
        <div className="size-4 bg-info-content"></div>
        <div className="size-4 bg-info"></div>
        <div>---</div>
        <div className="size-4 bg-success-content"></div>
        <div className="size-4 bg-success"></div>
        <div>---</div>
        <div className="size-4 bg-warning-content"></div>
        <div className="size-4 bg-warning"></div>
        <div>---</div>
        <div className="size-4 bg-error-content"></div>
        <div className="size-4 bg-error"></div>
        
      </div>
    </>
  );
}

export default App;
