import React, { Component, MouseEvent } from "react";
import styles from "./ContactItem.module.css";

interface ContactItemProps {
  handleDelete: (id: string) => void;
  name: string;
  number: string;
}

class ContactItem extends Component<ContactItemProps> {
  handleClick = (evt: MouseEvent<HTMLElement>) => {
    const element: HTMLLIElement | null = evt.currentTarget.closest("li");
    if (element) {
      const id: string | undefined= element.dataset.value ;
      if(id != null){
          this.props.handleDelete(id);
          console.log("IDDDDD", id);
      }
    }
  };
  render() {
    const { name, number } = this.props;
    return (
      <>
        <p>{name}:</p>
        <p>{number}</p>
        <button onClick={this.handleClick} className={styles.button}>&#10006;</button>
      </>
    );
  }
}

export default ContactItem;
