import React from 'react'

interface FieldHeaderProps {
  text: string
}

const FieldHeader: React.FC<FieldHeaderProps> = (props) => {
  return <header className='field-header'>{props.text}</header>
}

export default FieldHeader
