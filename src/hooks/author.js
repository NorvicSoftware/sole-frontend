import axios from '@/lib/axios'

export const authorAPI = () => {
    const create = async (data) => {
        // console.log('llega edit ', id)
        for (const pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1])
        }
        // axios
        //     .post('/api/authors', data)
        //     .then(res => res.data)
        //     .catch(error => {
        //         console.log('error', error)
        //     })
    }

    const edit = async (data, id) => {
        axios
            .post(`/api/authors/${id}`, data)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    const destroy = async (id) => {
        axios
            .delete(`/api/authors/${id}`)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    const createPerfil = async ({ setErrors, ...props }) => {
        axios
            .post('/api/profiles', props)
            .then(res => {
                console.log('guardar', res.data)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    const editPerfil = async ({ setErrors, ...props }, id) => {
        axios
            .put(`/api/profiles/${id}`, props)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    return {
        create,
        edit,
        destroy,
        createPerfil,
        editPerfil,
    }
}
