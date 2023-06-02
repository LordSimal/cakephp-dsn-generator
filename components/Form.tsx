'use client';

import {useState} from "react";
import Conditional from "@/components/Conditional";
import Copy from "@/components/Copy";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";

export default function Form() {

    const [port, setPort] = useState<number|null>(3306);
    const [showUserPass, setShowUserPass] = useState(true);
    const [dsnString, setDsnString] = useState('');

    const onDbmsSelect = (e: any) => {
        let value = e.target.value;
        if (value === 'sqlite') {
            setShowUserPass(false);
            setPort(null);
        } else if(value === 'mysql') {
            setShowUserPass(true);
            setPort(3306);
        } else if(value === 'postgres') {
            setShowUserPass(true);
            setPort(5432);
        }
        setDsnString('');
    }

    const onSubmitFunc = (e: any) => {
        e.preventDefault()

        const data = {
            dbms: e.target.dbms.value,
            server: e.target.server.value,
            port: e.target.port.value,
            username: undefined,
            password: undefined,
            database: e.target.database.value,
        };

        if (showUserPass) {
            data.username = e.target.username.value;
            data.password = e.target.password.value;
        }

        // Should result in something like
        // mysql://user:pass@localhost:3306/database?encoding=utf8&timezone=UTC&cacheMetadata=true
        let result = `${data.dbms}://`;
        if (data.username && data.password) {
            result += `${data.username}:${data.password}@`;
        }
        result += `${data.server}`;
        if (data.port) {
            result += `:${data.port}`;
        }
        result += `/${data.database}`;

        setDsnString(result);
    }

    return (
        <div className="p-10 sm:p-20">
            <div className="text-3xl text-center text-white mb-10">DSN Generator</div>
            <form action="/" method="post" onSubmit={onSubmitFunc}>
                <div className="overflow-hidden shadow rounded">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">

                            <FormSelect name="dbms"
                                        className="col-span-6"
                                        options={{
                                            'mysql': 'MySQL/MariaDB',
                                            'postgres': 'PostgreSQL',
                                            'sqlite': 'SQLite'
                                        }}
                                        onChange={onDbmsSelect}
                            />

                            <FormInput type="text" name="server" className="col-span-4" label="Server" otherAttrs={{value: 'localhost'}}/>
                            <FormInput type="number" name="port" className="col-span-2" label="Port" otherAttrs={{min: 0, step: 1, value:port ?? ''}}/>

                            <Conditional showWhen={showUserPass}>
                                <FormInput type="text" name="username" className="col-span-6" label="Username"/>
                                <FormInput type="password" name="password" className="col-span-6" label="Password"/>
                            </Conditional>

                            <FormInput type="text" name="database" className="col-span-6" label="Database" required={true}/>

                        </div>
                    </div>

                    <Conditional showWhen={dsnString !== ''}>
                        <Copy text={dsnString}></Copy>
                    </Conditional>

                    <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                        <button
                          type="submit"
                          className="w-full rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >Generate</button>
                    </div>
                </div>
            </form>
        </div>
    )
}