import Toolbar from './containers/Toolbar';
import CurrentProject from './containers/CurrentProject';
import Summary from './containers/Summary';

function App() {
  return (
    <div className="p-d-inline-flex p-jc-center">
      <Toolbar />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50vw' }}>
          <CurrentProject />

        </div>
        <div style={{ width: '50vw' }}>
            <Summary />
        </div>
      </div>

    </div>
  );
}

export default App;

