'use client'

import s from './Copy.module.scss';
import {useState} from "react";
import Conditional from "@/components/Conditional";

export default function Copy({text, disabled, label = 'Copy'}:{text: string, disabled?: boolean, label?:string}) {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = (value:string) => {
    navigator.clipboard.writeText(value).then(()=> {
      setCopied(true);
      setTimeout(()=>{
        setCopied(false);
      }, 1500)
    });
  }
    return (
      <div className={`${s.field} flex items-center justify-between px-7 relative`}>
        <span className="text-ellipsis overflow-hidden whitespace-nowrap">{text}</span>
        <Conditional showWhen={!disabled}>
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={()=>{copy(text)}} aria-label={label}>{label}</button>
        </Conditional>
        {<div className={`fixed top-1/2 right-0 p-4 z-30 overflow-hidden ${copied ? `${s.active}` : ''} ${s.toast}`}>
          <div className={`${s.toastInner} px-4 py-2 shadow-lg rounded border-l-4`}>Copied to clipboard!</div>
        </div>}
      </div>
    )
}