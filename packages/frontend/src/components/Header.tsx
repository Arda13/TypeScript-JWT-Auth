import React from "react";

export default function Header() {
    return (
        <div className="py-6 px-12 bg-green-800 text-white flex justify-between">
            <div className="flex items-center">
                <div className="font-semibold text-lg"> WholeNoods</div>
                <div className="w-0 h-6 border-r border-white mx-6"></div>
                <div className="space-x-8 flex items-center"> 
                    <a className="font-bold text-lg hover:underline"href=""> Browse Products</a>
                    <a className="font-bold text-lg hover:underline"href=""> Tips & Ideas</a>
                </div>
            </div>
            <div>
                <a className="font-bold text-lg hover:underline"href="">Login</a>
            </div>
        </div>
    )
}