import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/use-auth";
import { removeUser } from "store/slices/userSlice";
import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { uuid } from "uuidv4";
import "../components/App.css";
import Header from "../components/Header";
import AddContact from "../components/AddContact";
import ContactList from "../components/ContactList";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return isAuth ? (
    <div>
      <div className="ui container">
        <Header />
        <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} />
        <button
          className="ui button orange"
          onClick={() => dispatch(removeUser())}
        >
          Log out from {email}
        </button>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default HomePage;
