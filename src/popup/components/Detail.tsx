import React, { ChangeEvent } from 'react';

interface DetailProps {
  name: string
  value: string
  type: string
}

function onHandleNumberChange(e: ChangeEvent<HTMLInputElement>) {
  let { value } = e.target
  console.log(value)
}

const Detail: React.FC<DetailProps> = (props) => {
  return (
    <div className="detail-wrapper">
      <label className="detail-label" htmlFor="detail-input">{props.name}</label>
      <input className="detail-input" type={props.type} defaultValue={props.value} onChange={onHandleNumberChange} />
    </div>
  );
};

export default Detail;
