import React, { Component, ChangeEvent } from "react";
import styles from "./SearchPanel.module.css"
interface SearchPanelProps {
  onHandleFilter: (value: string) => void;
}

class SearchPanel extends Component<SearchPanelProps> {
  state = {
    value: ""
  };
  onChangePanel = (evt: ChangeEvent<HTMLInputElement>): void => {
    const values = evt.target.value.toLowerCase();
    this.props.onHandleFilter(values);
  };
  render() {
    return (
      <>
        <h3 className={styles.title}>Find contacts by name</h3>
        <input
          placeholder="Search contact"
          onChange={this.onChangePanel}
          //   value={this.state.value}
        />
      </>
    );
  }
}

export default SearchPanel;
