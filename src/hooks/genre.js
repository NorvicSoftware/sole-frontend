import axios from '@/lib/axios'

export const genreAPI = () => {
    const create = async ({ setErrors, ...props }) => {
        axios
            .post('/api/genres', props)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    const edit = async ({ setErrors, ...props }, id) => {
        axios
            .put(`/api/genres/${id}`, props)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    const destroy = async (id) => {
        axios
            .delete(`/api/genres/${id}`)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    return {
        create,
        edit,
        destroy,
    }
}
