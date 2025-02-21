'use client'

import { ResponseAiProps } from "@/interfaces/responseAi";
import { Skeleton } from "../ui/skeleton";

export function ResponseAi({ message, response, isLoading, start }: ResponseAiProps) {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <div className="w-full rounded-lg shadow-lg p-6 mb-4">
        <h1 className="text-2xl font-bold text-center text-blue-500">Chat de análise de protocolo</h1>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-start w-full mt-8">
            {start && (
                <div className="bg-blue-800 rounded-xl p-4 ml-2 max-w-[70%]">
                    <p className="text-gray-200 text-sm whitespace-pre-wrap break-words">{message}</p>
                </div>
            )}
        </div>

        <div className="flex justify-end w-full mt-8">
            {isLoading ? (
                <Skeleton className="h-[80px] w-full max-w-[70%] rounded-xl" />
            ) : (
                response && (
                    <div className="bg-blue-800 rounded-xl mr-2 p-4 max-w-[70%] ml-auto">
                        <p className="text-gray-200 text-sm whitespace-pre-wrap break-words">{response}</p>
                    </div>
            )
            )}
        </div>
      </div>
    </div>
  );
}