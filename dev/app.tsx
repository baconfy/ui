import {Route, Routes} from 'react-router-dom'
import Layout from "./components/layout";
import HomePage from "./pages/home-page";
import ButtonPage from "./pages/buttons-page";
import AccordionPage from "./pages/accordion-page";

export default function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="accordion" element={<AccordionPage/>}/>
        <Route path="button" element={<ButtonPage/>}/>
        <Route path="modal" element={<div className="p-6 bg-white rounded-lg shadow"><h2 className="text-2xl font-semibold">Modal - Em breve!</h2></div>}/>
        <Route path="input" element={<div className="p-6 bg-white rounded-lg shadow"><h2 className="text-2xl font-semibold">Input - Em breve!</h2></div>}/>
        <Route path="card" element={<div className="p-6 bg-white rounded-lg shadow"><h2 className="text-2xl font-semibold">Card - Em breve!</h2></div>}/>
      </Route>
    </Routes>
  )
}