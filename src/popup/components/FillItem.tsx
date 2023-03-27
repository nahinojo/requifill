import 
  React,
  { 
    HTMLAttributes, 
    InputHTMLAttributes, 
    LabelHTMLAttributes,
    FC,
    ReactEventHandler,
    ChangeEvent,
    SyntheticEvent,
  }
from 'react';

type HTMLProps = Pick<
  HTMLAttributes<HTMLElement>, 
  "id"
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

interface OnBlurEvent extends ChangeEvent<HTMLInputElement> {};

const FillItem: FC<FillItemProps> = (props) => {

  const saveValue: ReactEventHandler<HTMLInputElement> = async (
    evt: OnBlurEvent
  ) => {
    console.log(evt)
    console.log("Object name: ", evt.target.name)
    const { name } = evt.target
    const syncStorage = await browser.storage.sync.set({
      [name]: props.value
    })
  }
  return (
    <div 
      className="fill-item-wrapper"
      id={props.id}
    >
      <label 
        className="fill-item-label"
        id={props.id+"-label"} 
        htmlFor={props.id+"-input"} 
        >{props.title}</label>
      <input
        className="fill-item-input"
        name={props.name}
        id={props.id+"-input"}
        value={props.value}
        type={props.type}
        pattern={props.pattern}
        inputMode={props.inputMode}
        onChange={props.onChange}
        onBlur={saveValue}
      />
    </div>
  );
};

export default FillItem;
