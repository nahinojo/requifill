import 
  React,
  { 
    HTMLAttributes, 
    InputHTMLAttributes, 
    LabelHTMLAttributes, 
    useState,
    FC,
    ReactEventHandler,
    ChangeEvent
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
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    console.log('Calling onAnyChange()...')
    setInputValue(ev.target.value)
  };

  const onNumberChange: ReactEventHandler<HTMLInputElement> = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    console.log('Calling onNumberChange()...')
    const newValue = ev.target.value
    const lastCharIsNumeric = !isNaN(Number(newValue[newValue.length - 1]))
    console.log('newValue: ', newValue)
    console.log('lastCharIsNumeric', lastCharIsNumeric)
    if (lastCharIsNumeric || newValue === '') {
      console.log('Setting to newValue:', newValue)
      setInputValue(newValue)
    } else {
      console.log('Setting to inputValue:', inputValue)
      setInputValue(inputValue)
    }
    return
  };

  const onPhoneChange: ReactEventHandler<HTMLInputElement> = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    console.log('onPhoneChange() is WIP...')
    return 
  };


  // Delete for production
  const onLogChange: ReactEventHandler<HTMLElement> = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    console.log('Executing onLogChange()...')
    console.log(ev)
  };


  let onInputChange = onAnyChange
  switch (props.type) {
    case 'number':
      onInputChange = onNumberChange;
      break;
    case 'tel':
      onInputChange = onPhoneChange
  };



  
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
        value={inputValue}
        onChange={onInputChange}
      />
    </div>
  );
};

export default Field;
