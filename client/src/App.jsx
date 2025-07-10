
import './App.css'
import { Button } from './components/ui/button'
import Navbar from './components/ui/Navbar'
import Login from './pages/Login'
import { ThemeProvider } from "./ThemeProvider";

function App() {

  return (
    <main>
      <ThemeProvider>
      <Navbar/>
    <Login/>
    </ThemeProvider>
    </main>
  )
}

export default App
