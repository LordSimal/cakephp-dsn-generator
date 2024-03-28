'use client';

import { useEffect, useState } from 'react';
import Conditional from '@/components/Generics/Conditional';
import Copy from '@/components/Generics/Copy';
import FormInput from '@/components/Generics/FormInput';
import FormSelect from '@/components/Generics/FormSelect';
import Optional from '@/components/Optional';
import generateDSN from '@/lib/DSNGenerator';

export default function DSNForm() {
  const [port, setPort] = useState<number | null>(3306);
  const [dsnString, setDsnString] = useState('');
  const [showPort, setShowPort] = useState(true);
  const [showUserPass, setShowUserPass] = useState(true);
  const [showOptional, setShowOptional] = useState(true);
  const [isPostgres, setIsPostgres] = useState(false);
  const [cleanValues, setCleanValues] = useState(false);

  const onDbmsSelect = (e: any) => {
    const { value } = e.target;
    if (value === 'sqlite') {
      setShowUserPass(false);
      setPort(null);
      setShowPort(false);
      setIsPostgres(false);
      setShowOptional(true);
    } else if (value === 'mysql') {
      setShowUserPass(true);
      setPort(3306);
      setShowPort(true);
      setIsPostgres(false);
      setShowOptional(true);
    } else if (value === 'postgres') {
      setShowUserPass(true);
      setPort(5432);
      setShowPort(true);
      setIsPostgres(true);
      setShowOptional(true);
    } else if (value === 'sqlserver') {
      setShowUserPass(true);
      setPort(1433);
      setShowPort(true);
      setIsPostgres(false);
      setShowOptional(true);
    } else if (value === 'redis') {
      setShowUserPass(true);
      setPort(6379);
      setShowPort(true);
      setIsPostgres(false);
      setShowOptional(false);
    }
    setDsnString('');
    setCleanValues(true);
  };

  const onSubmitFunc = (e: any) => {
    e.preventDefault();
    const result = generateDSN(e.target, showPort, showUserPass);
    setDsnString(result);
  };

  // Reset clean values state after cleaning is done
  useEffect(() => {
    if (cleanValues) {
      setCleanValues(false);
    }
  }, [cleanValues]);

  return (
    <form action='/' method='post' onSubmit={onSubmitFunc}>
      <div className='overflow-hidden rounded bg-white px-4 py-5 shadow sm:p-6'>
        <div className='grid grid-cols-6 gap-6'>
          <FormSelect
            name='dbms'
            label='Connection Type'
            className='col-span-6'
            options={{
              mysql: 'MySQL/MariaDB',
              postgres: 'PostgreSQL',
              sqlite: 'SQLite',
              sqlserver: 'MS SQL/SQL Server',
              redis: 'Redis',
            }}
            onChange={onDbmsSelect}
          />

          <FormInput
            type='text'
            name='server'
            className={`${showPort ? 'col-span-4' : 'col-span-6'}`}
            label='Server'
            otherAttrs={{ initialValue: 'localhost' }}
            cleanValue={cleanValues}
          />
          <Conditional showWhen={showPort}>
            <FormInput
              type='number'
              name='port'
              className='col-span-2'
              label='Port'
              otherAttrs={{ min: 0, step: 1, initialValue: port ?? '' }}
              cleanValue={cleanValues}
            />
          </Conditional>

          <Conditional showWhen={showUserPass}>
            <FormInput
              type='text'
              name='username'
              className='col-span-6'
              label='Username'
              cleanValue={cleanValues}
            />
            <FormInput
              type='password'
              name='password'
              className='col-span-6'
              label='Password'
              cleanValue={cleanValues}
            />
          </Conditional>

          <FormInput
            type='text'
            name='database'
            className='col-span-6'
            label='Database'
            required={true}
            cleanValue={cleanValues}
          />
        </div>

        <Conditional showWhen={showOptional}>
          <Optional isPostgres={isPostgres} cleanValue={cleanValues} />
        </Conditional>

        <Conditional showWhen={dsnString !== ''}>
          <Copy text={dsnString}></Copy>
        </Conditional>

        <div className='bg-gray-50 py-3 text-center'>
          <button
            type='submit'
            className='w-full rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          >
            Generate
          </button>
        </div>
      </div>
    </form>
  );
}
