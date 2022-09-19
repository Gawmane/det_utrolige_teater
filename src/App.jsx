//Router
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRouter } from './Components/Tools/Router/AppRouter';

//Components 
import { Header } from '../src/Components/Partials/Header';
import { Main } from '../src/Components/Partials/Main';
import { Footer } from '../src/Components/Partials/Footer';

//Style
import './assets/Style/App.scss';




function App() {
  return (
    <>
      {/* Router - Skal omfange de sider vi har på siden*/}
      <Router>
        <Header />
        <Main>
          {/* Indsætter approuter inde i vores main da alt indhold skal ind under main (chrild) */}
          <AppRouter />
        </Main>
        <Footer />
      </Router>
    </>
  );
}
export default App;