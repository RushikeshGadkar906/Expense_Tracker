import './assets/css/style.scss';
import Home from './components/Home';
import { ExpensesProvider } from './context/expensesContext';


function App() {
  
  return (
    <>
      <ExpensesProvider>
        <Home />
      </ExpensesProvider>
    </>
  )
}

export default App
