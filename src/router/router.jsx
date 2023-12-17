import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from '../pages/auth/auth';
import Dashboard from '../pages/Dashboard/Dashboard'
import Result from '../pages/Result/Result';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/result' element={<Result />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}