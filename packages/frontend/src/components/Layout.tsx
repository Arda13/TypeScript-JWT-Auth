import React from "react";
import Header from "./Header";

type Props = {
    children: React.ReactNode;
}
export default function Layout({children}: Props) {
    return <div className="container mx-auto">
        <Header></Header>
        {children}
    </div>
}