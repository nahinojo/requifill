import React from "react";

interface DetailHeaderProps {
    text: string
}
const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
    return <header className="detail-header">{props.text}</header>
}
export default DetailHeader;