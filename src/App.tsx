import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routeConfigs } from "./route";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routeConfigs.map(({ id, path, element }) => (
            <Route key={id} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

