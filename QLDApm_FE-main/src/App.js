import './App.scss'
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import {
  Home,
  Login,
  Signup,
  Profile,
  Reservation,
  NotFoundPage,
  ChefsPage,
  Order,
  Booking,
  DishDetailPage,
  Menu,
  MenuDetail,
  Payment,
  OrderHistory,
  ChangePassword,
  ManageMenu,
  Dashboard,
  ManageMenuDetail,
  ManageOrder,
} from './pages'
import { UserLayout, AdminLayout, HomeLayout, ScrollToTop, ProtectedRoute } from 'components'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Global */}
        <Route
          path=""
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <HomeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>

        {/* Auth */}
        <Route path="auth" element={<UserLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* User */}
        <Route
          path="home"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="reservation">
            <Route index element={<Reservation />} />
            <Route path="booking" element={<Booking />} />
            <Route path="order" element={<Order />} />
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="chefs" element={<ChefsPage />} />
          <Route path="menu">
            <Route index element={<Menu />} />
            <Route path="detail" element={<MenuDetail />} />
            <Route path="dish">
              <Route index element={<Navigate to="/home/menu" replace />} />
              <Route path=":id" element={<DishDetailPage />} />
            </Route>
          </Route>
        </Route>

        {/* User */}
        <Route
          path="user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Admin & Staff */}
        <Route
          path="management"
          element={
            <ProtectedRoute allowedRoles={['admin', 'staff']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="menu">
            <Route index element={<ManageMenu />} />
            <Route path="add" element={<ManageMenuDetail />} />
            <Route path="edit">
              <Route index element={<Navigate to="/management/menu/add" replace />} />
              <Route path=":id" element={<ManageMenuDetail />} />
            </Route>
          </Route>
          <Route path="account" />
          <Route path="order" element={<ManageOrder />} />
          <Route path="report" />
        </Route>

        {/* Else */}
        <Route path="*" element={<UserLayout />}>
          <Route index element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
