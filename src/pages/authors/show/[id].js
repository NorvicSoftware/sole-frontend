import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

const Show = () => {
    const router = useRouter()
    const [full_name, setFullName] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [country, setCountry] = useState('')

    const [career, setCareer] = useState('')
    const [biography, setBiography] = useState('')
    const [website, setWebsite] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState('')
    useEffect(() => {
        axios
            .get(`/api/authors/${router.query.id}/profiles`)
            .then(res => {
                console.log('perfil: ', res.data)
                setFullName(res.data.author.full_name)
                setBirthDate(FormatDate(res.data.author.birth_date))
                setCountry(res.data.author.country)
                if (res.data.image != null) {
                    setImage('http://127.0.0.1:8000' + res.data.image)
                }
                if (res.data.author.profile != null) {
                    setCareer(res.data.author.profile.career)
                    setBiography(res.data.author.profile.biography)
                    setWebsite(res.data.author.profile.website)
                    setEmail(res.data.author.profile.email)
                }
            })
            .catch(error => {
                console.log('error', error)
            })
    }, [router.query.id])

    function FormatDate(data) {
        const date = new Date(data.replace(/-/g, '\/'))
        const options = { year: "numeric", month: "2-digit", day: "2-digit" }
        return date.toLocaleDateString('es-MX', options)
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ver Autor
                </h2>
            }>

            <Head>
                <title>Laravel - Author</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between py-3">
                                <div>
                                    <h3><strong>{ full_name }</strong></h3>
                                    <p><strong>Fecha Nacimiento:</strong> { birth_date }</p>
                                    <p><strong>País:</strong> { country }</p>
                                    <h3><strong>Perfil de autor</strong></h3>
                                    { career !== '' ? (
                                        <div>
                                            <p><strong>Carrera:</strong> { career }</p>
                                            <p><strong>Biografia:</strong> { biography }</p>
                                            <p><strong>Página Web:</strong> { website }</p>
                                            <p><strong>Correo Electrónico:</strong> { email }</p>
                                        </div>
                                    ) : (
                                        <p> El autor no tiene un perfil registrado</p>
                                    ) }
                                </div>
                                <img src={ image } className="rounded-lg w-64"/>
                            </div>
                            <div className="flex justify-end">
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

export default Show
