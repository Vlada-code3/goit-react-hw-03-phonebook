import React, { Component } from 'react';
import ContactsForm from './contactsForm/ContactsForm';
import ContactsList from './contactsList/ContactsList';
// import { v4 as uuid } from 'uuid';
import Section from './section/Section';

import ContactsFilter from './filter/ContactsFilter';
import axios from 'axios';




class Contacts extends Component {
    state = {
        filter: '',
        name: '',
        number: '',
        contacts: [
           
        ],
        
    };


    async componentDidMount() {
    
        try {
            const { data } = await axios.get(`https://phonebook-d0d0b-default-rtdb.firebaseio.com/contacts.json`)
       
            if (data) {
                const contacts = Object.keys(data).map(key =>
                    ({ id: key, ...data[key] }))
                this.setState({contacts})
            
       }

            console.log(data);
            
        } catch (error) {
            
        }
}



    addContact = async (contact) => {
try {
    
    const { data } = await axios.post(
        `https://phonebook-d0d0b-default-rtdb.firebaseio.com/contacts.json`,
        contact);
    this.setState((prevState) => ({
        
            contacts: [...prevState.contacts, { ...contact, id: data.name }]
        }));
    console.log(data);
} catch (error) {
    
}
   
    }
    

    onDeleteContact = async (e) => {

        try {
            const { id } = e.target
            const { data } = await axios.delete(
                `https://phonebook-d0d0b-default-rtdb.firebaseio.com/contacts/${id}.json`

            );
            this.setState({
                contacts: this.state.contacts.filter(contact => contact.id !== id)
            })
        } catch (error) {
            
        }
       
        
    }


    checkDublicateName = (name) => {
    

       return this.state.contacts.some((contact) => contact.name === name);

        

    };


  

    setFilter = (e) => {
        const { value } = e.target
        this.setState({
            filter: value
        })
    };

    getFilteredClients = () => {
        return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase()))
    }
    render() {
        return (
            
            <>
                <Section title="Phonebook">
                    
                   
                    <ContactsForm addContact={this.addContact} checkDublicateName={this.checkDublicateName} />
                    
                </Section>
                
                <Section title="Find contact by name">
                    <ContactsFilter filter={this.state.filter} setFilter={this.setFilter} />
                </Section>
                    
                <Section title="Contacts">
                    <ContactsList contacts={this.state.contacts} onDeleteContact={this.onDeleteContact} contacts={this.getFilteredClients()}/>
                </Section>
               

                </>

        );
    }
}

export default Contacts;