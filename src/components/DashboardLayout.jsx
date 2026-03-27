import React, { useState, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardHeader from './DashboardHeader'

export const SearchContext = createContext('')

const DashboardLayout = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <SearchContext.Provider value={searchQuery}>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased">
        <div className="layout-container flex h-full grow flex-col">
          <DashboardHeader onSearchChange={setSearchQuery} />
          <Outlet />
        </div>
      </div>
    </SearchContext.Provider>
  )
}

export default DashboardLayout
