import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { authorAPI } from '@/hooks/author'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'

const Create = () => {
    const { create, edit } = authorAPI()
    const router = useRouter()

    const [full_name, setFullName] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [country, setCountry] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const submitForm = async (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('image', image)
        data.append('full_name', full_name)
        data.append('birth_date', birth_date)
        data.append('country', country)
        if (!router.query.id) {
            create(data)
        } else {
            data.append('_method', 'put')
            edit(data, router.query.id)
        }
        await router.push('/authors')
    }
    const onChangeHandler = event => {
        setImageUrl(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0])
    }
    useEffect(() => {
        if (router.query.id) {
            axios
                .get(`/api/authors/${router.query.id}`)
                .then(res => {
                    setFullName(res.data.author.full_name)
                    setBirthDate(res.data.author.birth_date)
                    setCountry(res.data.author.country)
                    if (res.data.image != null) {
                        setImageUrl('http://127.0.0.1:8000' + res.data.image)
                    }
                })
                .catch(error => {
                    console.log('error', error)
                })
        }
    }, [router.query.id])
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {router.query.id ? "Editar Author" : "Crear Author"}
                </h2>
            }>
            <Head>
                <title>Laravel - Authors</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submitForm}>
                                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                                    <div className="mb-3 xl:w-96">
                                        <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">
                                            Nombre
                                        </label>
                                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            value={full_name}
                                            onChange={event => setFullName(event.target.value)}
                                            id="exampleFormControlInput1"
                                            placeholder="Nombre"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">
                                            Fecha de Nacimiento
                                        </label>
                                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                               value={birth_date}
                                               onChange={event => setBirthDate(event.target.value)}
                                               id="exampleFormControlInput1"
                                               placeholder="yyyy-mm-dd"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">
                                            País
                                        </label>
                                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                               value={country}
                                               onChange={event => setCountry(event.target.value)}
                                               id="exampleFormControlInput1"
                                               placeholder="País"
                                        />
                                    </div>
                                    <div className="mb-3 w-96">
                                        <label htmlFor="formFileMultiple" className="form-label inline-block mb-2 text-gray-700">
                                            Imagen
                                        </label>
                                        <input type="file" className="form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                               onChange={onChangeHandler}
                                               id="formFile" />
                                    </div>
                                    <img src={imageUrl} className="rounded-lg w-48 py-2" />
                                    <button
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="mb-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Guardar Author
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
