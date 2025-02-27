import {RouterWrapper} from "./routes/routerWrapper.tsx";

import './App.css'
import {DataProvider} from "./context/DataContext.tsx";

function App() {
  return (
      <DataProvider>
        <RouterWrapper/>
      </DataProvider>
  )
}

export default App
