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
  
  const onInputChangeAny: ReactEventHandler<HTMLElement> = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    console.log('Calling onAnyChange()...')
  };

  const onInputChangeNumber: ReactEventHandler<HTMLInputElement> = (
    ev: any
  ) => {
    console.log('Calling onNumberChange()...')
    const { data } = ev
    console.log('data: ', data)
    console.log('inputValue', inputValue)
    if (data !== ''){
      console.log('setting input')
      setInputValue(data)
    } else {
      console.log('preventing default')
      ev.preventDefault()
    }
  };

  const onInputChangePhone: ReactEventHandler<HTMLInputElement> = (
    ev: ChangeEvent<HTMLInputElement>
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
    return
  };

  let onInputChange = onInputChangeAny
  switch (props.type) {
    case 'number':
      onInputChange = onInputChangeNumber;
      break;
    case 'tel':
      onInputChange = onInputChangePhone;
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
        onBeforeInputCapture={onInputChangeNumber}
      />
    </div>
  );
};


export default Field;
