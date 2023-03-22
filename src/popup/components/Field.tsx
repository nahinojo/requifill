import 
  React,
  { 
    HTMLAttributes, 
    InputHTMLAttributes, 
    LabelHTMLAttributes, 
    ReactEventHandler, 
    ChangeEvent, 
    useState,
    FC
  } from 'react';

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, "className" | "id">;
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">;
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "inputMode">;

interface FieldProps extends HTMLProps, LabelProps, InputProps {
  name: string
}

const Field: FC<FieldProps> = (props) => {
  const [value, setValue] = useState<string>('')
  
  return (
    <div className="field-wrapper">
      <label 
        className="field-label"
        id={props.id+"-label"} 
        htmlFor="field-input"
        >{props.name}</label>
      <input
        className="field-input"
        id={props.id+"-input"}
        type={props.type}
        inputMode={props.inputMode}
      />
    </div>
  );
};

export default Field;
