import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './employee/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from './employee/Add';
import View from './employee/View';
import Edit from './employee/Edit';
import IndexData from './Data/IndexData';
import IndexMaps from './Maps/IndexMaps';
import Nmea from './Maps/Dataku';

import './assets/leaflet/leaflet.js';
import './assets/leaflet/leaflet.css';


function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/employee' element={<Home/>}/>
          <Route path='/em/add' element={<Add/>}/>
          <Route path='/em/:id' element={<View/>}/>
          <Route path='/em/edit/:id' element={<Edit/>}/>

          <Route path='/data' element={<IndexData/>}></Route>
          <Route path='/maps' element={<Nmea/>}></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App
