import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ThemeProvider } from "./context/theme/ThemeProvider"

function App() {

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      {/* <Button variant="primary" icon={PiggyBank}>Teste</Button> */}
    </ThemeProvider>

  )
}

export default App
