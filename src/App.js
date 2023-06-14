import React from 'react';
import ListResources from './Components/ListeRessources';
import ResourceDetail from './Components/ResourceDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
           <Route path="/" element={<ListResources/>} />
           <Route path="/resources/:id" element={<ResourceDetail/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );

}

export default App;
