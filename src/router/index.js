import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alliance from '../pages/alliance';
import Operator from '../pages/Operator';
import Strategy from '../pages/Strategy';
import Equipment from '../pages/equipment';
import Enemy from '../pages/enemy';
import Layout from  '../components/layout';

const AppRouter = () => {
    return (
        <Router basename="/alliance-page">
            <Routes>
                {/* 根路由嵌套其他页面 */}
                <Route path="/" element={<Layout />} >
                    <Route index element={<Operator />} />
                    <Route path="operator" element={<Operator />} />
                    <Route path="alliance" element={<Alliance />} />
                    <Route path="Strategy" element={<Strategy />} />
                    <Route path="equipment" element={<Equipment />} />
                    <Route path="enemy" element={<Enemy />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;