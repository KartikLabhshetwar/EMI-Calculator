import EMICalculator from './components/EMICalculator';
import { ThemeProvider } from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <EMICalculator />
    </ThemeProvider>
  );
}

export default App;