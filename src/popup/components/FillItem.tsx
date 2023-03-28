import 
  React,
  { 
    HTMLAttributes, 
    InputHTMLAttributes, 
    LabelHTMLAttributes,
    FC,
    ReactEventHandler,
    FormEventHandler,
    ChangeEvent,
    SyntheticEvent,
    useRef,
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
interface OnBlurEvent extends SyntheticEvent<HTMLInputElement>{
  target: HTMLInputElement & {
    name : string
  } 
};
interface OnKeydownEvent extends SyntheticEvent<HTMLInputElement>{
  key : string
};


const FillItem: FC<FillItemProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSaveValue: ReactEventHandler<HTMLInputElement> = async (
    evt: OnBlurEvent
  ) => {
    const { name } = evt.target
    await browser.storage.sync.set({[name]: props.value})
  };

  const handleEnterKeydown: ReactEventHandler<HTMLInputElement> = async (
    evt: OnKeydownEvent
  ) => {
    const { key } = evt
    if (key==="Enter") {
      inputRef.current?.blur()
    }
  };

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
        ref={inputRef}
        type={props.type}
        pattern={props.pattern}
        inputMode={props.inputMode}
        onChange={props.onChange}
        onBlur={handleSaveValue}
        onKeyDown={handleEnterKeydown}
      />
    </div>
  );
};

export default FillItem;
