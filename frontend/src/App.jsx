import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ExploreQuestionsPage from './pages/ExploreQuestionsPage';
import QuestionSolverPage from './pages/QuestionSolverPage';
import AIAssistantPage from './pages/AIAssistantPage';
import CompaniesPage from './pages/CompaniesPage';
import CategoriesPage from './pages/CategoriesPage';
import ProfilePage from './pages/ProfilePage';
import ReferencePage from './pages/ReferencePage';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/questions" element={<ExploreQuestionsPage />} />
          <Route path="/solver/:id" element={<QuestionSolverPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reference" element={<ReferencePage />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;