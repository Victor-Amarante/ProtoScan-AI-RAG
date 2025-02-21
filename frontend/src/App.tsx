import { ResponseAi, TextArea, UploadArea } from '@/components';
import { sendMessage } from '@/process/rag';
import { errorToast, successToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { Send } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [isAllowedToSend, setIsAllowedToSend] = useState(false);
  const [start, setStart] = useState(false);
  const [request, setRequest] = useState('')
  const [response, setResponse] = useState('')

  const handleSendMessage = async (message: string) => {
    const { data } = await sendMessage(message)

    setRequest(message)
    setResponse(data.answer)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleSendMessage,
    onSuccess: () => {
      successToast('Message enviada com sucesso');
    },
    onError: () => {
        errorToast('Erro ao enviar mensagem');
        setIsAllowedToSend(false)
        setRequest('')
        setResponse('')
        setStart(false)
    }
  });

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center ">
      <div className={clsx(
        'flex flex-col w-[40%] h-full justify-center items-center border-2 border-blue-100',
        !isAllowedToSend ? 'border-none mb-4' : ' rounded-2xl my-4'
      )}>
        {!isAllowedToSend ? (
          <div className="w-full max-w-2xl mt-8 rounded-lg shadow-lg p-8 flex items-center justify-center">
            <UploadArea setIsAllowedToSend={setIsAllowedToSend}/>
          </div>
        ) : (
          <ResponseAi message={request} response={response} isLoading={isPending} start={start} />
        )}

        <footer className="w-full mt-auto">
          <TextArea
            value={start ? '' : request}
            onChange={(e) => {setRequest(e.target.value)}}
            disabled={!isAllowedToSend || isPending}
            onSubmitFunction={(value) => {
              setStart(true)
              mutate(value)
            }}
            placeholder="Escreva sua mensagem sobre o protocolo..."
            iconRight={<Send size={20} color="blue" />}
          />
        </footer>
      </div>
    </div>
  )
}

export default App
