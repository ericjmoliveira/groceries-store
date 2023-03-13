import { useLocation } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyle';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  const { pathname } = useLocation();
  const renderHeader = pathname !== '/signin' && pathname !== '/signup';

  return (
    <div className="App">
      <GlobalStyle />
      {renderHeader && <Header />}
      <Content>
        <AppRoutes />
      </Content>
      <Footer />
    </div>
  );
}

export default App;
