import client from "./api"

const uploadFile = async (formData: FormData) => {
    const { data } = await client.post('/upload', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return { data }
}

const sendMessage = async (question: string): Promise<{ data: { answer: string } }> => {
    const { data } = await client.post(`/chat?question=${question}`)

    return { data }
}

export { sendMessage, uploadFile }

