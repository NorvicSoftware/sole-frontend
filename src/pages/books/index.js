import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Router from 'next/router'
import Button from '@/components/Button'
import ViewLink from '@/components/ViewLink'
import EditLink from '@/components/EditLink'

const Index = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios
            .get('/api/books')
            .then(res => {
                setBooks(res.data)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    }, [])

    function FormatDate(data) {
        const date = new Date(data.replace(/-/g, '\/'))
        const options = { year: "numeric", month: "2-digit", day: "2-digit" }
        return date.toLocaleDateString('es-MX', options)
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Libros
                </h2>
            }>
            <Head>
                <title>Laravel - Book</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex space-x-2 justify-start">
                                <Button
                                    type="button"
                                    onClick={() => Router.push('/books/create', '/books/create')}>
                                    Nuevo Libro
                                </Button>
                            </div>
                            <table className="min-w-full">
                                <thead className="border-b bg-gray-50">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Libro
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Lenguaje
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Nº Páginas
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Fecha Publicación
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Acción
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { books?.map((book) => (
                                        <tr className="bg-white border-b" key={book.id}>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                <h3>{ book.title }</h3>
                                                <p>{ book.subtitle }</p>
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                { book.language }
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                { book.page }
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                { FormatDate(book.published)}
                                            </td>
                                            <td className="flex space-x-2 text-sm text-gray-900 font-light px-6 py-4">
                                                <ViewLink href={{ pathname:`/books/show/[id]`, query: { id: book.id }
                                                }} as={`/books/show/${book.id}`}>
                                                </ViewLink>
                                                <EditLink href={{ pathname:`/books/edit/[id]`, query: { id: book.id }
                                                }} as={`/books/edit/${book.id}`}>
                                                </EditLink>
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
