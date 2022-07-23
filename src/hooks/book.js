import axios from '@/lib/axios'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

export const bookAPI = () => {
    const { addToast } = useToasts()
    const router = useRouter()

    const create = async ({ setErrors, ...props }) => {
        setErrors([])
        axios
            .post('/api/books', props)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/books')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al crear el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    const edit = async ({ setErrors, ...props }, id) => {
        setErrors([])
        axios
            .put(`/api/books/${id}`, props)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/authors')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al editar el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }


    return {
        create,
        edit
    }
}
