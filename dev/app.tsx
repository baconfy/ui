import {Route, Routes} from 'react-router-dom'
import Layout from "./components/layout";
import HomePage from "./pages/home-page";
import ButtonPage from "./pages/buttons-page";
import AccordionPage from "./pages/accordion-page";
import AlertPage from "./pages/alert-page";
import AlertDialogPage from "./pages/alert-dialog-page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="accordion" element={<AccordionPage/>}/>
        <Route path="alert" element={<AlertPage/>}/>
        <Route path="alert-dialog" element={<AlertDialogPage/>}/>
        <Route path="button" element={<ButtonPage/>}/>
      </Route>
    </Routes>
  )
}