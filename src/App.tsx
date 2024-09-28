import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ConfigProvider } from 'antd';
import { AppProvider } from 'Context/AppContext';
import MainLayout from 'Layout/MainLayout';
import { ADMIN_ROUTER } from 'router';
import { LoginPage, NotFoundPage } from 'Pages';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Quicksand',
          colorText: '#141D49',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          {ADMIN_ROUTER.map((e) => (
            <Route
              key={e.key}
              path={e.path}
              element={
                <AppProvider>
                  <MainLayout navKey={e.navKey} >
                    {e.element}
                  </MainLayout>
                </AppProvider>
              }
            />
          ))}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
