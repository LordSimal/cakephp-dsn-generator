'use client';

import Conditional from "@/components/Conditional";
import UserPass from "@/components/UserPass";
import {useState} from "react";
import Copy from "@/components/Copy";

export default function Form() {

    const [showUserPass, setShowUserPass] = useState(true);
    const [dsnString, setDsnString] = useState('');

    const onDbmsSelect = (e: any) => {
        if (e.target.value === 'sqlite') {
            setShowUserPass(false);
        } else {
            setShowUserPass(true);
        }
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

                            <div className="col-span-6">
                                <label htmlFor="dbms" className="block text-sm font-medium text-gray-700">DBMS</label>
                                <select
                                  id="dbms"
                                  name="dbms"
                                  autoComplete="dbms"
                                  onChange={onDbmsSelect}
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                >
                                    <option value="mysql">MySQL/MariaDB</option>
                                    <option value="postgres">PostgreSQL</option>
                                    <option value="sqlite">SQLite</option>
                                </select>
                            </div>

                            <div className="col-span-4">
                                <label htmlFor="server" className="block text-sm font-medium text-gray-700">Server</label>
                                <input
                                  type="text"
                                  name="server"
                                  id="server"
                                  autoComplete="server"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="port" className="block text-sm font-medium text-gray-700">Port</label>
                                <input
                                  type="number"
                                  min="0"
                                  step="1"
                                  name="port"
                                  id="port"
                                  autoComplete="port"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                            </div>

                            <Conditional showWhen={showUserPass}>
                                <UserPass/>
                            </Conditional>

                            <div className="col-span-6">
                                <label htmlFor="database" className="block text-sm font-medium text-gray-700">Database</label>
                                <input
                                  type="text"
                                  name="database"
                                  id="database"
                                  autoComplete="database"
                                  required={true}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                            </div>

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