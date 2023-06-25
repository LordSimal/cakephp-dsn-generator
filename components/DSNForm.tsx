'use client';

import { useState } from 'react';
import Conditional from '@/components/Conditional';
import Copy from '@/components/Copy';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import Optional from '@/components/Optional';
import generateDSN from '@/lib/DSNGenerator';

export default function DSNForm() {
  const [port, setPort] = useState<number|null>(3306);
  const [dsnString, setDsnString] = useState('');
  const [showPort, setShowPort] = useState(true);
  const [showUserPass, setShowUserPass] = useState(true);
  const [isPostgres, setIsPostgres] = useState(false);

  const onDbmsSelect = (e: any) => {
    const { value } = e.target;
    if (value === 'sqlite') {
      setShowUserPass(false);
      setPort(null);
      setShowPort(false);
      setIsPostgres(false);
    } else if (value === 'mysql') {
      setShowUserPass(true);
      setPort(3306);
      setShowPort(true);
      setIsPostgres(false);
    } else if (value === 'postgres') {
      setShowUserPass(true);
      setPort(5432);
      setShowPort(true);
      setIsPostgres(true);
    } else if (value === 'sqlserver') {
      setShowUserPass(true);
      setPort(1433);
      setShowPort(true);
      setIsPostgres(false);
    }
    setDsnString('');
  };

  const onSubmitFunc = (e: any) => {
    e.preventDefault();
    const result = generateDSN(e.target, showPort, showUserPass);
    setDsnString(result);
  };

  return (
        <form action="/" method="post" onSubmit={onSubmitFunc}>
            <div className="overflow-hidden bg-white px-4 py-5 sm:p-6 shadow rounded">
                <div className="grid grid-cols-6 gap-6">

                    <FormSelect name="dbms"
                                label="DBMS"
                                className="col-span-6"
                                options={{
                                  mysql: 'MySQL/MariaDB',
                                  postgres: 'PostgreSQL',
                                  sqlite: 'SQLite',
                                  sqlserver: 'MS SQL/SQL Server',
                                }}
                                onChange={onDbmsSelect}
                    />

                    <FormInput type="text" name="server" className={`${showPort ? 'col-span-4' : 'col-span-6'}`} label="Server" otherAttrs={{ defaultValue: 'localhost' }}/>
                    <Conditional showWhen={showPort}>
                        <FormInput type="number" name="port" className="col-span-2" label="Port" otherAttrs={{ min: 0, step: 1, defaultValue: port ?? '' }}/>
                    </Conditional>

                    <Conditional showWhen={showUserPass}>
                        <FormInput type="text" name="username" className="col-span-6" label="Username"/>
                        <FormInput type="password" name="password" className="col-span-6" label="Password"/>
                    </Conditional>

                    <FormInput type="text" name="database" className="col-span-6" label="Database" required={true}/>

                </div>

                <Optional isPostgres={isPostgres}/>

                <Conditional showWhen={dsnString !== ''}>
                    <Copy text={dsnString}></Copy>
                </Conditional>

                <div className="bg-gray-50 py-3 text-center">
                    <button
                      type="submit"
                      className="w-full rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >Generate</button>
                </div>
            </div>
        </form>
  );
}
