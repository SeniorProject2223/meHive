import './App.css';
import ContactListPage from './ContactListPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ContactProfile from './ContactProfile';
import AddContact from './addContact';
import UserSelection from './UserSelection';
import SalesforceAuth from './salesforceAuth';
import SalesforceImport from './salesforceImport'
import Error from './Error';
import React from "react";

function App() {
  return(
    <BrowserRouter>
      <Routes>

          <Route path="/" element={<UserSelection></UserSelection>}></Route>
          <Route path="error" element={<Error></Error>}></Route>
          <Route path="contacts" element={<ContactListPage></ContactListPage>}> </Route>
          <Route path="profile" element={<ContactProfile></ContactProfile>}> </Route>
          <Route path="add" element={<AddContact key = {"isNew"} isNew = {1}></AddContact>}> </Route>
          <Route path="edit" element={<AddContact key = {"isNew"} isNew = {0}></AddContact>}> </Route>
          <Route path="auth" element={<SalesforceAuth></SalesforceAuth>}> </Route>
          <Route path="import" element={<SalesforceImport></SalesforceImport>}> </Route>
      </Routes>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;

