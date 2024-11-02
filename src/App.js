import AppHeader from './components/appHeader/AppHeader';
import AppFooter from './components/appFooter/AppFooter';
import NavigationBar from './components/navigationBar/NavigationBar';
import Container from '@mui/material/Container';


function App() {
  return (
    <div className="App">
      <AppHeader />
      <Container maxWidth="xxl" >
        <NavigationBar />
      </Container>
      <AppFooter />
    </div>
  );
}

export default App;
