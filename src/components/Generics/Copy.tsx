'use client';

import { useState } from 'react';
import Conditional from './Conditional';
import s from './Copy.module.scss';

export default function Copy({
  text,
  disabled,
  label = 'Copy',
}: {
  text: string;
  disabled?: boolean;
  label?: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  };
  return (
    <div className={`relative bg-white`}>
      <div className='result-container mb-5 overflow-x-scroll rounded border border-green-500 p-2 text-center text-xl'>
        {text}
      </div>
      <Conditional showWhen={!disabled}>
        <button
          className='w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          onClick={() => copy(text)}
          aria-label={label}
        >
          {label}
        </button>
      </Conditional>
      {
        <div
          className={`fixed right-0 top-1/2 z-30 overflow-hidden p-4 ${copied ? `${s.active}` : ''} ${s.toast}`}
        >
          <div className={`rounded border-l-4 bg-white px-4 py-2 shadow-lg`}>
            Copied to clipboard!
          </div>
        </div>
      }
    </div>
  );
}
