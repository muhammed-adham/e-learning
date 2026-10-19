import React from 'react'
import SideMenu from '../components/SideMenu'
import SlideBanner from '../components/SlideBanner'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
    <SideMenu />
    <SlideBanner />
    <Outlet />
    </>
  )
}

export default Layout