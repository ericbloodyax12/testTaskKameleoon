import {RouterWrapper} from "./routes/routerWrapper.tsx";

import './App.css'
import {DataProvider} from "./context/DataContext.ts";

function App() {
  return (
      <DataProvider>
        <RouterWrapper/>
      </DataProvider>
  )
}

export default App
