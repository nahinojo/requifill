import React from "react";

interface FillHeaderProps {
    text: string
}

const FillHeader: React.FC<FillHeaderProps> = (props) => {
    return <header className="fill-header">{props.text}</header>
};
export default FillHeader;