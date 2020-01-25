import React, { Component } from "react";
import ContactItem from "./contact-item/ContactItem";
import SearchPanel from "./search-panel/SearchPanel";
import User from "../../models/User";
import styles from "./Contacts.module.css"
interface ContactsProps {
  onHandleFilter: (value: string) => void;
  handleDelete: (id: string) => void;
  value: User[];
}

class Contacts extends Component<ContactsProps> {
  render() {
    return (
      <div>
        <h3 className={styles.title}>Contacts</h3>
        <SearchPanel onHandleFilter={this.props.onHandleFilter} />
        <ul>
          {this.props.value &&
            this.props.value.map(elem => (
              <li key={elem.id} data-value={elem.id}>
                <ContactItem {...elem} handleDelete={this.props.handleDelete} />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default Contacts;
