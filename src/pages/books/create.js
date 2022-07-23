import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { bookAPI } from '@/hooks/book'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Label from '@/components/Label'
import Input from '@/components/Input'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import PreviousLink from '@/components/PreviousLink'
import Select from '@/components/Select'
import Multiselect from '@/components/Multiselect'
import Textarea from '@/components/Textarea'
import axios from '@/lib/axios'

const Create = () => {
    const { create } = bookAPI()
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [language, setLanguage] = useState('Español')
    const [page, setPage] = useState('')
    const [published, setPublished] = useState('')
    const [description, setDescription] = useState('')
    const [genre_id, setGenreID] = useState('')
    const [publisher_id, setPublisherId] = useState('')
    const [authors_id, setAuthorsId] = useState([])
    const [genres, setGenres] = useState([])
    const [publishers, setPublishers] = useState([])
    const [authors, setAuthors] = useState([])

    const ChooseValueLanguage = (val) => {
        setLanguage(val)
    }
    const ChooseValueGenre = (val) => {
        setGenreID(parseInt(val))
    }
    const ChooseValuePublisher = (val) => {
        setPublisherId(parseInt(val))
    }

    const ChooseMultiValueAuthors = (val) => {
        const updatedOptions = [...val.target.options]
            .filter(option => option.selected)
            .map(x => x.value)
        setAuthorsId(updatedOptions)
    }

    const submitForm = async (event) => {
        event.preventDefault()
        const authorsJSON = authors_id.map((val) => {
            return { id: parseInt(val) }
        })
        create({ title, subtitle, language, page, published, description, genre: { id: genre_id }, publisher: { id: publisher_id }, authors: authorsJSON,  setErrors })
    }

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data)
                setGenreID(res.data[0].id)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })

        axios
            .get('/api/publishers')
            .then(res => {
                setPublishers(res.data)
                setPublisherId(res.data[0].id)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })

        axios
            .get('/api/authors')
            .then(res => {
                setAuthors(res.data)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Libro
                </h2>
            }>
            <Head>
                <title>Laravel - Authors</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <AuthValidationErrors className="mb-4" errors={errors} />
                            <form onSubmit={submitForm}>
                                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="title">Título</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={title}
                                            className="block mt-1 w-full"
                                            onChange={event => setTitle(event.target.value)}
                                            placeholder="Título"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="subtitle">Sub Titulo</Label>
                                        <Input
                                            id="subtitle"
                                            type="text"
                                            value={subtitle}
                                            className="block mt-1 w-full"
                                            onChange={event => setSubtitle(event.target.value)}
                                            placeholder="Sub Título"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="page">Num. Páginas</Label>
                                        <Input
                                            id="page"
                                            type="text"
                                            maxLength="5"
                                            value={page}
                                            className="block mt-1 w-full"
                                            onChange={event => setPage(event.target.value)}
                                            placeholder="Num. Páginas"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="language">Idioma</Label>
                                        <Select onChange={(val) => ChooseValueLanguage(val.target.value)} value={language}>
                                            <option value="Español">Español</option>
                                            <option value="Ingles">Ingles</option>
                                            <option value="Portugues">Portugues</option>
                                        </Select>
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="published">Fecha publicación</Label>
                                        <Input
                                            id="published"
                                            type="text"
                                            value={published}
                                            className="block mt-1 w-full"
                                            onChange={event => setPublished(event.target.value)}
                                            placeholder="yyyy-mm-dd"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="language">Género Literario</Label>
                                        <Select onChange={(val) => ChooseValueGenre(val.target.value)} value={genre_id}>
                                            { genres?.map((genre) => (
                                                <option value={genre.id} key={genre.id}>{genre.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="language">Editorial</Label>
                                        <Select onChange={(val) => ChooseValuePublisher(val.target.value)} value={publisher_id}>
                                            { publishers?.map((publisher) => (
                                                <option value={publisher.id} key={publisher.id}>{publisher.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="language">Autor(es)</Label>
                                        <Multiselect onChange={ChooseMultiValueAuthors} value={authors_id} options={authors}>
                                            { authors?.map((author) => (
                                                <option value={author.id} key={author.id}>{author.full_name}</option>
                                            ))}
                                        </Multiselect>
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea
                                            id="description"
                                            rows="3"
                                            value={description}
                                            onChange={event => setDescription(event.target.value)}
                                            placeholder="Descripción"
                                        />
                                    </div>
                                    <Button>Guardar Libro</Button>
                                </div>
                            </form>
                            <div className="flex justify-end ">
                                <PreviousLink href="/books"></PreviousLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Create
