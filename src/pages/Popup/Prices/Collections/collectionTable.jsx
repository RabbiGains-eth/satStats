import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const CollectionTable = (props) => {
  const handleItemDelete = (recievedIndex, name) => {
    console.log(recievedIndex);
    const deletedCollection = props.data[recievedIndex];

    const filteredData = props.data.filter(items => {
      return items !== deletedCollection;
    });
    props.setData(filteredData);
    props.onItemDelete(name)
  };

  const tableData = props.data.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{`${item.floorPrice} btc`}</td>
      <td>
        {
          <FaTrashAlt
            className="delete-icon"
            onClick={() => handleItemDelete(index, item.name)}
          />
        }
      </td>
    </tr>
  ));
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Tick</th>
            <th>Floor</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default CollectionTable;
