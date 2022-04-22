import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Link from 'next/link'
import { authorAPI } from '@/hooks/author'

const Create = () => {
    const { createPerfil, editPerfil } = authorAPI()
    const router = useRouter()
    const [full_name, setFullName] = useState('')
    const [perfil_id, setPerfilId] = useState('')
    const [career, setCareer] = useState('')
    const [biography, setBiography] = useState('')
    const [website, setWebsite] = useState('')
    const [email, setEmail] = useState('')
    const [id, setAuthorId] = useState('')
    useEffect(() => {
        axios
            .get(`/api/authors/${router.query.id}/profiles`)
            .then(res => {
                console.log('perfil: ', res.data)
                setFullName(res.data.full_name)
                setAuthorId(res.data.id)
                if (res.data.profile != null) {
                    setPerfilId(res.data.profile.id)
                    setCareer(res.data.profile.career)
                    setBiography(res.data.profile.biography)
                    setWebsite(res.data.profile.website)
                    setEmail(res.data.profile.email)
                }
            })
            .catch(error => {
                console.log('error', error)
                // if (error.response.status !== 409) throw error
            })
    }, [router.query.id])

    const submitForm = event => {
        event.preventDefault()
        if (!perfil_id) {
            createPerfil({ career, biography, website, email, author: { id } })
        } else {
            editPerfil({ career, biography, website, email, author: { id } }, perfil_id)
        }
        router.push('/authors')
    }
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Perfil { full_name }
                </h2>
            }>
            <Head>
                <title>Laravel - Profile Author</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submitForm}>
                                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                                    <div className="mb-3 xl:w-96">
                                        <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">
                                            Carrera
                                        </label>
                                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                               value={ career }
                                               onChange={event => setCareer(event.target.value)}
                                               id="exampleFormControlInput1"
                                               placeholder="Carrera"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">
                                            Página Web
                                        </label>
                                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                               value={ website }
                                               onChange={event => setWebsite(event.target.value)}
                                               id="exampleFormControlInput1"
                                               placeholder="Página Web"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">
                                            Correo Electrónico
                                        </label>
                                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                               value={ email }
                                               onChange={event => setEmail(event.target.value)}
                                               id="exampleFormControlInput1"
                                               placeholder="Correo Electrónico"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700">
                                            Biografia
                                        </label>
                                        <textarea
                                            className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            value={ biography }
                                            onChange={event => setBiography(event.target.value)}
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            placeholder="Biografia">
                                        </textarea>
                                    </div>
                                    <button
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="mb-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Guardar Perfil
                                    </button>
                                </div>
                            </form>
                            <div className="flex justify-end ">
                                <Link href="/authors">
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
export default Create
