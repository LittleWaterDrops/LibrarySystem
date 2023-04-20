import React from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./pages/main/components/Header"
import AddDataScreen from "./pages/main/screens/AddDataScreen"
import MainScreen from "./pages/main/screens/MainScreen"
import ManagementScreen from "./pages/main/screens/ManagementScreen"
import "./App.css"
import ActionDataScreen from "./pages/main/screens/ActionDataScreen"

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/addData" element={<AddDataScreen />} />
          <Route path="/manage" element={<ManagementScreen />} />
          <Route path="/addData/:dataNumber" element={<AddDataScreen />} />
          <Route path="/actionData" element={<ActionDataScreen />} />
        </Routes>
      </div>
    </>
  )
}

export default App
