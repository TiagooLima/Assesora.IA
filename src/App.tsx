import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { Button } from "./components/shared/Button"
import { PiggyBank } from "lucide-react"

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Button variant="primary" icon={PiggyBank}>Teste</Button>
    </>
  )
}

export default App