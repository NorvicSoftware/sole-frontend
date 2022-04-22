import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

const Show = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    useEffect(() => {
        axios
            .get(`/api/genres/${router.query.id}`)
            .then(res => {
                setName(res.data.name)
                setDescription(res.data.description)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    }, [router.query.id])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ver Género Literario
                </h2>
            }>

            <Head>
                <title>Laravel - Genre</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3><strong>{ name }</strong></h3>
                            { description }
                            <div className="flex justify-end ">
                                <Link href="/genres">
                                    <a className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cat" className="w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path>
                                        </svg>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Show
