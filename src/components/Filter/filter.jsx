import { useState, useEffect } from "react";
import "./filter.css";

function Filter() {
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    const dynamicFieldsData = JSON.parse(localStorage.getItem("dynamicFieldsData")) || [];
    const mergedData = [...storedData, ...dynamicFieldsData];
    if (mergedData.length > 0) {
      setData(mergedData);
    }
  }, []);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const filteredStaticFields = data.filter((item) => item.date === filterValue);

  const filteredDynamicFields = data.flatMap((item) => {
    const dynamicFields = [];
    for (let i = 1; i <= Object.keys(item).length; i++) {
      const dynamicFieldNameKey = `dynamicFieldName_${i}`;
      const dynamicFieldDateKey = `dynamicFieldDate_${i}`;
      const dynamicFieldPriceKey = `dynamicFieldPrice_${i}`;
      if (item[dynamicFieldDateKey] === filterValue) {
        dynamicFields.push({
          name: item[dynamicFieldNameKey],
          date: item[dynamicFieldDateKey],
          price: item[dynamicFieldPriceKey],
        });
      }
    }
    return dynamicFields;
  });

  const filteredData = [...filteredStaticFields, ...filteredDynamicFields];

  return (
    <div className="filter">
      <div className="filterdate">
        <div className="heading">
        <h2>Filtered Data</h2>
        <div className="Label">
          Filter by Date:
          <input
            className="date"
            type="date"
            value={filterValue}
            onChange={handleFilterChange}
          />
          </div>
        </div>
        <div>
        {filteredData.length > 0 ? (
          <table> 
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
          )}
          </div>
      </div>
    </div>
  );
}

export default Filter;
