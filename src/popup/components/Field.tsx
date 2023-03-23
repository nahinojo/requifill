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
  }
from 'react';

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, "className" | "id">;
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">;
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange">;
interface FieldProps extends HTMLProps, LabelProps, InputProps {
  name: string
};

const Field: FC<FieldProps> = (props) => {
  const [inputValue, setInputValue] = useState('')
  
  const onAnyChange: ReactEventHandler<HTMLElement> = (
    ev: any
  ) => {
    console.log('Calling onAnyChange()...')
    setInputValue(inputValue+ev.data)
  };

  const onNumberChange: ReactEventHandler<HTMLInputElement> = (
    ev: any
  ) => {
    console.log('Calling onNumberChange()...')
    const { data } = ev
    console.log("Event:", ev)
    console.log('data: ', data)
    console.log('inputValue', inputValue)
    if (isNaN(data)){
      console.log('preventing default')
      ev.preventDefault()
    } else {
      console.log('inputValue+data: ', inputValue+data)
      setInputValue(inputValue+data)
    }
  };

  const onPhoneChange: ReactEventHandler<HTMLInputElement> = (
    ev: any
  ) => {
    console.log('onPhoneChange() is WIP...')
    return 
  };

  // Delete for production
  const onLogEvent: ReactEventHandler<HTMLElement> = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    console.log('Executing onLogEvent()...')
    console.log(ev)

  };

  let onInputChange = onAnyChange
  switch (props.type) {
    case 'number':
      onInputChange = onNumberChange;
      break;
    case 'tel':
      onInputChange = onPhoneChange;
  };

  // reference 
  const eventPreventDefault: ReactEventHandler<HTMLInputElement> = (
    ev: SyntheticEvent
  ) => {
    ev.preventDefault()
  }

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
        value={inputValue}
      />
    </div>
  );
};


export default Field;
