import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { publisherAPI } from '@/hooks/publisher'

const Index = () => {
    const { destroy } = publisherAPI()
    const [publishers, setPublishers] = useState([])
    useEffect(() => {
        axios
            .get('/api/publishers')
            .then(res => {
                setPublishers(res.data)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    }, [])

    function destroyItem(id) {
        destroy(id)
        setPublishers([...publishers.filter((publisher) => publisher.id !== id)])
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editoriales
                </h2>
            }>

            <Head>
                <title>Laravel - Publishers</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex space-x-2 justify-start">
                                <button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    onClick={() => Router.push('/publishers/create', '/publishers/create')}
                                    className="mb-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                > Nueva Editorial
                                </button>
                            </div>
                            <table className="min-w-full">
                                <thead className="border-b bg-gray-50">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Editorial
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        País
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Sitio Web
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Correo Electrónico
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Acción
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                { publishers?.map((publisher) => (
                                    <tr className="bg-white border-b" key={publisher.id}>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { publisher.name }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { publisher.country }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { publisher.website }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { publisher.email }
                                        </td>
                                        <td className="flex space-x-2 text-sm text-gray-900 font-light px-6 py-4">
                                            <Link href={{ pathname: `/publishers/show/[id]`,
                                                query: { id: publisher.id }
                                            }} as={`/publishers/show/${publisher.id}`} >
                                                <a className="text-green-600 hover:text-green-700 transition duration-300 ease-in-out mb-4">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cat" className="w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor" d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path>
                                                    </svg>
                                                </a>
                                            </Link>
                                            <Link href={{ pathname: `/publishers/edit/[id]`,
                                                query: { id: publisher.id }
                                            }} as={`/publishers/edit/${publisher.id}`} >
                                                <a className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cat" className="w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>
                                                    </svg>
                                                </a>
                                            </Link>
                                            <button onClick={(e) => {
                                                e.stopPropagation()
                                                destroyItem(publisher.id)
                                            }}
                                                    className="inline-block rounded-full bg-red-600 text-white leading-normal uppercase shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-6">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" className="w-5 mx-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"></path>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Index
