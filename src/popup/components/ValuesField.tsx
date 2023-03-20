import React from 'react';

const ValuesField: React.FC = () => {
  return (
    <div className="values-field-wrapper">
      <label className="values-field-label" htmlFor="values-field-input">label text</label>
      <input className="values-field-input" type="text" defaultValue="input text" />
    </div>
  );
};

export default ValuesField;
