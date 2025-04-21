import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RepositoriesList from './components/RepositoriesList';
import './App.css';
import LayoutPage from './pages/LayoutPage';
import Repository from './components/Repository';
import ErrorBoundaryTest from './components/Button/ErrorBoundaryTest';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './pages/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route index element={<RepositoriesList />} />
            <Route path="repository/:repoName" element={<Repository />} />
            <Route path="error-test" element={<ErrorBoundaryTest />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;