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
interface FillItemProps extends HTMLProps, LabelProps, InputProps {
  title: string
};

const FillItem: FC<FillItemProps> = (props) => {

  return (
    <div 
      className="fill-item-wrapper"
      id={props.id}
    >
      <label 
        className="fill-item-label"
        id={props.id+"-label"} 
        htmlFor="fill-item-input"
        >{props.title}</label>
      <input
        className="fill-item-input"
        name={props.name}
        id={props.id+"-input"}
        type={props.type}
        pattern={props.pattern}
        value={props.value}
        onChange={props.onChange}
        inputMode={props.inputMode}
        onBlur={(e)=>(console.log(e))}
      />
    </div>
  );
};

export default FillItem;
