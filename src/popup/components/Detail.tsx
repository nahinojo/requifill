import React, { HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes,  ReactEventHandler, ChangeEvent, useState} from 'react';

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, "className" | "id">;
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, "type">;
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">;

interface DetailProps extends HTMLProps, InputProps, LabelProps {
  field: string
}

const Detail: React.FC<DetailProps> = (props) => {
  const [value, setValue] = useState<string>('')
  
  return (
    <div className="detail-wrapper">
      <label 
        className="detail-label"
        id={props.id+"-label"} 
        htmlFor="detail-input"
        >{props.field}</label>
      <input
        className="detail-input"
        id={props.id+"-input"}
        type={props.type}
        defaultValue={value}
      />
    </div>
  );
};

export default Detail;
