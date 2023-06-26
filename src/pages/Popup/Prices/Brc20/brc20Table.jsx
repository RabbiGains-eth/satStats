import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const Brc20Table = (props) => {
  const handleItemDelete = (index, ticker) => {
    const filteredData = props.data.filter((item) => {
      return item.id !== index;
    });
    props.setData(filteredData);
    props.onItemDelete(ticker);
  };

  const tableData = props.data.map((item, index) => (
    <tr key={index}>
      <td>{item.ticker}</td>
      <td>{`${item.price} sats`}</td>
      <td>{`${item.volume} btc`}</td>
      <td>
        {
          <FaTrashAlt
            className="delete-icon"
            onClick={() => handleItemDelete(item.id, item.ticker)}
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
            <th>Lowest Price</th>
            <th>24h Volume</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default Brc20Table;
