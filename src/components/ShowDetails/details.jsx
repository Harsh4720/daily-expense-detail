import React, { useEffect, useState } from "react";
import "./details.css";

function ShowDetails() {
  const [formDataObject, setFormDataObject] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormDataObject(parsedData);
    }
  }, []);

  const dynamicFieldCount = formDataObject.reduce((max, formData) => {
    let count = 0;
    for (const key in formData) {
      if (key.startsWith("dynamicFieldName_")) {
        count++;
      }
    }
    return Math.max(max, count);
  }, 0);

  return (
    <div className="container">
      <h2 className="show-detail">Show All Details</h2>
      {formDataObject.length > 0 ? (
        <div className="table">
      <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {formDataObject.map((formData, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>{formData.name}</td>
              <td>{formData.date}</td>
              <td>{formData.price}</td>
            </tr>
            {[...Array(dynamicFieldCount)].map((_, fieldIndex) => {
              const dynamicFieldNameKey = `dynamicFieldName_${fieldIndex + 1}`;
              const dynamicFieldDateKey = `dynamicFieldDate_${fieldIndex + 1}`;
              const dynamicFieldPriceKey = `dynamicFieldPrice_${fieldIndex + 1}`;
              return (
                <tr key={`${index}_dynamic_${fieldIndex}`}>
                  <td>{formData[dynamicFieldNameKey]}</td>
                  <td>{formData[dynamicFieldDateKey]}</td>
                  <td>{formData[dynamicFieldPriceKey]}</td>
                </tr>
              );
            })}
          </React.Fragment>
        ))}
      </tbody>
    </table>  
    </div>
      ) : (
        <p className="no-data">No data available</p>
      )}
    </div>
  );
}

export default ShowDetails;
