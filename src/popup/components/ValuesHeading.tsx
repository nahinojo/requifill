import React from "react";

interface ValuesHeadingProps {
    text: string
}
const ValuesHeading: React.FC<ValuesHeadingProps> = (props) => {
    return <header className="values-heading">{props.text}</header>
}
export default ValuesHeading;