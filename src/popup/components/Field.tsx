import 
  React,
  { 
    HTMLAttributes, 
    InputHTMLAttributes, 
    LabelHTMLAttributes,
    FC,
  }
from 'react';

type HTMLProps = Pick<
  HTMLAttributes<HTMLElement>, 
  "className" | "id"
>;
type LabelProps = Pick<
  LabelHTMLAttributes<HTMLLabelElement>, 
  "htmlFor"
>;
type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>, 
  "type" | "pattern" | "value" | "onChange" | "name" | "inputMode"
>;
interface FieldProps extends HTMLProps, LabelProps, InputProps {
  title: string
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
        >{props.title}</label>
      <input
        className="field-input"
        name={props.name}
        id={props.id+"-input"}
        type={props.type}
        pattern={props.pattern}
        value={props.value}
        onChange={props.onChange}
        inputMode={props.inputMode}
      />
    </div>
  );
};

export default Field;
