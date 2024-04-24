import { useState } from "react";
import "./form.css";

function Form() {
  const [dynamicFields, setDynamicFields] = useState([]);
  const [staticFields, setStaticFields] = useState({ name: "", date: "", price: "" });
  const [errors, setErrors] = useState([]);
  const [staticErrors, setStaticErrors] = useState({ name: "", date: "", price: "" });

const addNewField = () => {
  const isEmptyField = dynamicFields.some(field => !field.name || !field.date || !field.price) ||
    !staticFields.name || !staticFields.date || !staticFields.price;
  if (!isEmptyField) {
    setDynamicFields([...dynamicFields, { name: "", date: "", price: "" }]);
    setErrors([...errors, { name: "", date: "", price: "" }]); 
  } else {
    const dynamicFieldErrors = dynamicFields.map(field => ({
      name: !field.name ? "Name is required!" : "",
      date: !field.date ? "Date is required!" : "",
      price: !field.price ? "Price is required!" : ""
    }));
    setErrors([...dynamicFieldErrors, { name: "Name is required!", date: "Date is required!", price: "Price is required!" }]);
    setStaticErrors({ name: !staticFields.name ? "Name is required!" : "", 
                      date: !staticFields.date ? "Date is required!" : "", 
                      price: !staticFields.price ? "Price is required!" : "" });
  }
};


  const removeField = (index) => {
    const updatedFields = [...dynamicFields];
    updatedFields.splice(index, 1);
    setDynamicFields(updatedFields);
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const handleStaticFieldChange = (value, fieldName) => {
    setStaticFields({ ...staticFields, [fieldName]: value });

    const updatedStaticErrors = { ...staticErrors };
    updatedStaticErrors[fieldName] = value.trim() === "" ? `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` : "";
    setStaticErrors(updatedStaticErrors);
  };

  const handleDynamicFieldChange = (value, index, fieldName) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index][fieldName] = value;
    setDynamicFields(updatedFields);

    const updatedErrors = [...errors];
    updatedErrors[index][fieldName] = value.trim() === "" ? `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` : "";
    setErrors(updatedErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dynamicFieldsEmpty = dynamicFields.some(field => !field.name || !field.date || !field.price);
    const staticFieldsEmpty = !staticFields.name || !staticFields.date || !staticFields.price;

    if (dynamicFieldsEmpty || staticFieldsEmpty) {
      setStaticErrors({ 
        name: !staticFields.name ? "Name is required!" : "", 
        date: !staticFields.date ? "Date is required!" : "", 
        price: !staticFields.price ? "Price is required!" : "" 
      });

      const dynamicFieldErrors = dynamicFields.map(field => ({
        name: !field.name ? "Name is required!" : "",
        date: !field.date ? "Date is required!" : "",
        price: !field.price ? "Price is required!" : ""
      }));

      setErrors(dynamicFieldErrors);
      
      return;
    }

    const formData = new FormData(event.target);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    dynamicFields.forEach((field, index) => {
      formObject[`dynamicFieldName_${index + 1}`] = field.name;
      formObject[`dynamicFieldDate_${index + 1}`] = field.date;
      formObject[`dynamicFieldPrice_${index + 1}`] = field.price;
    });

    const existingFormData = JSON.parse(localStorage.getItem("formData")) || [];

    existingFormData.push(formObject);

    localStorage.setItem("formData", JSON.stringify(existingFormData));

    console.log(existingFormData);

    event.target.reset();

    setDynamicFields([]);
    setErrors([]);
    setStaticFields({ name: "", date: "", price: "" });
    setStaticErrors({ name: "", date: "", price: "" });
  };

  return (
    <div className="container">
      <div className="form">
        <div className="details">
          <h2>Add Details:</h2>
        </div>
        <div className="button">
          <button className="add" onClick={addNewField}>
            Add Field
          </button>
        </div>
      </div>
      <br />
      <form className="form" onSubmit={handleSubmit}>
        <div className="fields">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={staticFields.name}
              onChange={(e) => handleStaticFieldChange(e.target.value, "name")}
            />
            <span className="error">{staticErrors.name}</span>
          </div>
          <div className="enter-date">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={staticFields.date}
              onChange={(e) => handleStaticFieldChange(e.target.value, "date")}
            />
            <span className="error">{staticErrors.date}</span>
          </div>
          <div>
            <label className="price">Price:</label>
            <input
              type="text"
              name="price"
              value={staticFields.price}
              onChange={(e) => handleStaticFieldChange(e.target.value, "price")}
            />
            <span className="error">{staticErrors.price}</span>
          </div>
        </div>
        {dynamicFields.map((field, index) => (
          <div key={index} className="fields">
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={field.name}
                onChange={(e) => handleDynamicFieldChange(e.target.value, index, "name")}
              />
              <span className="error">{errors[index]?.name}</span>
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={field.date}
                onChange={(e) => handleDynamicFieldChange(e.target.value, index, "date")}
              />
              <span className="error">{errors[index]?.date}</span>
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                value={field.price}
                onChange={(e) => handleDynamicFieldChange(e.target.value, index, "price")}
              />
              <span className="error">{errors[index]?.price}</span>
            </div>
            <button className="remove" type="button" onClick={() => removeField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
