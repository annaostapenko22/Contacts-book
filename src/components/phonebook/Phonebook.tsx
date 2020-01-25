import React, { Component, FormEvent, ChangeEvent } from "react";
import shortid from "shortid";
import Contacts from "../contacts/Contacts";
import styles from "../phonebook/Phonebook.module.css";
import User from "../../models/User";
import Post from "../../models/Post";

interface PhonebookState {
  contacts: User[];
  filter: string;
  name: string;
  number: string;
}

class Phonebook extends Component<{}, PhonebookState> {
  state: PhonebookState = {
    contacts: [],
    filter: "",
    name: "",
    number: ""
  };
  componentDidMount(): void {
    const res: string | null = localStorage.getItem("users");
    let users: User[];
    console.log("here", res === "null");
    if (res != null) {
      users = JSON.parse(res);
    } else {
      users = [];
    }
    this.setState({ contacts: users });
    console.log("RES", users);
  }
  componentDidUpdate(prevProps: any, prevState: PhonebookState): void {
    if (
      JSON.stringify(prevState.contacts) !== JSON.stringify(this.state.contacts)
    ) {
      localStorage.setItem("users", JSON.stringify(this.state.contacts));
    }
  }

  deleteItems = (id: string): void => {
    console.log("id", typeof id, id);
    this.setState(({ contacts }) => {
      const newArr: User[] = contacts.filter(elem => elem.id !== id);
      return {
        contacts: newArr
      };
    });
  };

  onHandleGetValue = (evt: ChangeEvent<HTMLInputElement>): void => {
    const value: string = evt.target.value;
    const name: string = evt.target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onHandleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    const { name, number } = this.state;
    if (!name || !number) {
      alert("Please fill all the fileds");
      return;
    }
    if (this.state.contacts.find(elem => elem.name.includes(name))) {
      alert(`This user: ${name} already exists in your book`);
      return;
    }

    this.getPost({ id: shortid.generate(), name, number });
    this.setState({ name: "" });
    this.setState({ number: "" });
  };

  getPost = (post: Post): void => {
    this.setState(state => ({
      contacts: [...state.contacts, post]
    }));
  };

  setFilterState = (value: string): void => {
    this.setState({ filter: value });
  };

  filterItems = (filter: string, contacts: User[]): User[] => {
    if (this.state.contacts) {
      let contactList = [...contacts];

      if (filter) {
        contactList = contactList.filter(elem =>
          elem.name.toLowerCase().includes(filter)
        );
      }
      return contactList;
    }
    return [];
  };

  render() {
    const { contacts, name, number, filter } = this.state;
    const filteredItems: User[] | null = this.filterItems(filter, contacts);

    return (
      <div className={styles.container}>
        <form onSubmit={this.onHandleSubmit} className={styles.form}>
          <h2 className={styles.title}>Phonebook</h2>
          <label>
            <h3 className={styles.subtitle}>Name </h3>
            <input
              type="text"
              onChange={this.onHandleGetValue}
              value={name}
              name="name"
            />
          </label>
          <label>
            <h3 className={styles.subtitle}> Phone</h3>
            <input
              type="tel"
              value={number}
              onChange={this.onHandleGetValue}
              name="number"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              placeholder="FORMAT: XXX-XX-XXX"
              className={styles.input}
            />
          </label>
          <button className={styles.button}>Add contact</button>
        </form>
        <Contacts
          value={filteredItems}
          onHandleFilter={this.setFilterState}
          handleDelete={this.deleteItems}
        />
      </div>
    );
  }
}

export default Phonebook;
