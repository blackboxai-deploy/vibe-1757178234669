'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Contact, ContactList, ContactFilter } from '@/types/contacts';

interface ContactsState {
  contacts: Contact[];
  contactLists: ContactList[];
  selectedList?: string;
  filter: ContactFilter;
  isLoading: boolean;
  selectedContacts: string[];
}

interface ContactsContextType {
  state: ContactsState;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'callHistory'>) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  importContacts: (contacts: Contact[]) => void;
  setFilter: (filter: Partial<ContactFilter>) => void;
  clearFilter: () => void;
  selectContacts: (contactIds: string[]) => void;
  createContactList: (name: string, description?: string) => void;
  selectContactList: (listId?: string) => void;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

type ContactsAction =
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'UPDATE_CONTACT'; payload: { id: string; updates: Partial<Contact> } }
  | { type: 'DELETE_CONTACT'; payload: string }
  | { type: 'IMPORT_CONTACTS'; payload: Contact[] }
  | { type: 'SET_FILTER'; payload: Partial<ContactFilter> }
  | { type: 'CLEAR_FILTER' }
  | { type: 'SELECT_CONTACTS'; payload: string[] }
  | { type: 'CREATE_CONTACT_LIST'; payload: { name: string; description?: string } }
  | { type: 'SELECT_CONTACT_LIST'; payload?: string }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: ContactsState = {
  contacts: [],
  contactLists: [],
  filter: {},
  isLoading: false,
  selectedContacts: [],
};

function contactsReducer(state: ContactsState, action: ContactsAction): ContactsState {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? { ...contact, ...action.payload.updates, updatedAt: new Date() }
            : contact
        ),
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
        selectedContacts: state.selectedContacts.filter(id => id !== action.payload),
      };
    case 'IMPORT_CONTACTS':
      return {
        ...state,
        contacts: [...state.contacts, ...action.payload],
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filter: {},
      };
    case 'SELECT_CONTACTS':
      return {
        ...state,
        selectedContacts: action.payload,
      };
    case 'CREATE_CONTACT_LIST':
      const newList: ContactList = {
        id: Date.now().toString(),
        name: action.payload.name,
        description: action.payload.description,
        contacts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        totalContacts: 0,
        completedContacts: 0,
      };
      return {
        ...state,
        contactLists: [...state.contactLists, newList],
      };
    case 'SELECT_CONTACT_LIST':
      return {
        ...state,
        selectedList: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(contactsReducer, initialState);

  const addContact = (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'callHistory'>) => {
    const contact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      callHistory: [],
    };
    dispatch({ type: 'ADD_CONTACT', payload: contact });
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: { id, updates } });
  };

  const deleteContact = (id: string) => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  const importContacts = (contacts: Contact[]) => {
    dispatch({ type: 'IMPORT_CONTACTS', payload: contacts });
  };

  const setFilter = (filter: Partial<ContactFilter>) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  const selectContacts = (contactIds: string[]) => {
    dispatch({ type: 'SELECT_CONTACTS', payload: contactIds });
  };

  const createContactList = (name: string, description?: string) => {
    dispatch({ type: 'CREATE_CONTACT_LIST', payload: { name, description } });
  };

  const selectContactList = (listId?: string) => {
    dispatch({ type: 'SELECT_CONTACT_LIST', payload: listId });
  };

  return (
    <ContactsContext.Provider
      value={{
        state,
        addContact,
        updateContact,
        deleteContact,
        importContacts,
        setFilter,
        clearFilter,
        selectContacts,
        createContactList,
        selectContactList,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};