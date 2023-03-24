import 
  React,
  { 
    HTMLAttributes, 
    InputHTMLAttributes, 
    LabelHTMLAttributes, 
    useState,
    FC,
    ReactEventHandler,
    ChangeEvent,
    SyntheticEvent,
    FormEvent,
  }
from 'react';

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, "className" | "id">;
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">;
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "onBeforeInput">;
interface FieldProps extends HTMLProps, LabelProps, InputProps {
  name: string
};

const Field: FC<FieldProps> = (props) => {

  return (
    <div 
      className="field-wrapper"
      id={props.id}
    >
      <label 
        className="field-label"
        id={props.id+"-label"} 
        htmlFor="field-input"
        >{props.name}</label>
      <input
        className="field-input"
        id={props.id+"-input"}
        type={props.type}
        onBeforeInput={props.onBeforeInput}
      />
    </div>
  );
};

export default Field;
