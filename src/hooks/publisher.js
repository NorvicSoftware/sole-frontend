import axios from '@/lib/axios'

export const publisherAPI = () => {
    const create = async ({ setErrors, ...props }) => {
        axios
            .post('/api/publishers', props)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    const edit = async ({ setErrors, ...props }, id) => {
        axios
            .put(`/api/publishers/${id}`, props)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    const destroy = async (id) => {
        axios
            .delete(`/api/publishers/${id}`)
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
