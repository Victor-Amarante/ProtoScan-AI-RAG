import { uploadFile } from '@/process/rag';
import { errorToast, successToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { CloudUpload, File, Trash } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

export function UploadArea({ setIsAllowedToSend }: { setIsAllowedToSend: (isAllowed: boolean) => void }) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  }

  const handleUploadFiles = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await uploadFile(formData);
    return data;
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['files'],
    mutationFn: handleUploadFiles,
    onSuccess: () => {
      successToast('Arquivo enviado com sucesso');
      setIsAllowedToSend(true);
      setFile(null);
    },
    onError: () => {
      errorToast('Erro ao enviar arquivo');
    }
  });

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <CloudUpload className='w-16 h-16 text-blue-500' />
          <span className="text-blue-500">Clique aqui ou arraste um arquivo para fazer upload</span>
          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
            accept=".pdf"
          />
          {!file && (
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Selecionar Arquivo
            </label>
          )}
        </div>
      </div>

      {file && (
        <div className="w-full p-3 border border-blue-300 rounded-md">
          <div className="flex justify-between">
            <div className='flex items-center gap-4'>
              <File className='w-4 h-4 text-blue-500' />
              <span className="text-blue-500 max-w-56 truncate">{file.name}</span>
            </div>
            <div className='flex items-center gap-4'>
              <Trash className='w-4 h-4 text-red-300 cursor-pointer' onClick={() => setFile(null)} />
            </div>
          </div>
        </div>
      )}

      {file && (
        <button
          onClick={() => mutate(file)}
          disabled={isPending}
          className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
        >
          {isPending ? 'Enviando...' : 'Enviar Arquivo'}
        </button>
      )}
    </div>
  );
}