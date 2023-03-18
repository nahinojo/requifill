import React from "react";

interface HeaderProps {
    text: string
}
const Header: React.FC<HeaderProps> = (props) => {
    return <header>{props.text}</header>
}
export default Header;