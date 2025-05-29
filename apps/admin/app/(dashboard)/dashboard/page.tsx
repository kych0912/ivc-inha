'use client';
import * as React from 'react';
import { XCircleIcon } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@ivc-inha/ui';
import { useFormStatus } from 'react-dom';
import { useFileUpload } from '../hooks/useFileUpload';
import { useActionState } from 'react';
import { updateFormLinkAction } from '../actions';
import { ActionState } from '@/lib/auth/middleware';

function SubmitButton() {
    const { pending } = useFormStatus();
    
    return (
        <Button 
            type="submit"
            disabled={pending}              
            className="mt-4 w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-foreground hover:bg-foreground-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
            {pending ? '업로드 중...' : '업로드'}
        </Button>
    );
}

export default function Dashboard() {
    const {
        file,
        name,
        formRef,
        state,
        formAction,
        onDropFiles,
        dragOver,
        onClickFileUpload,
        handleReset,
    } = useFileUpload();
    
    const [linkState, linkAction, _] = useActionState<ActionState, FormData>(
        updateFormLinkAction,
        { error: '' },
    );

    return (
    <div >
        <div className="p-4">
            <Card className="bg-card">
                <CardHeader className="pb-0">
                    <CardTitle>
                        제목
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        ref={formRef}
                        action={async (formData) => {
                            await linkAction(formData);
                        }}
                    >
                        <Input
                            id="link"
                            name="link"
                            type="text"
                            placeholder="구글폼 링크"
                            required
                        />

                        {linkState.error && (
                            <p className="mt-2 text-red-500">{linkState.error}</p>
                        )}

                        {linkState.success && (
                            <p className="mt-2 text-green-500">{linkState.success}</p>
                        )}
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>

        <div className="p-4">
            <Card>
                <CardHeader className="pb-0">    
                    <CardTitle>
                        첨부파일
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        ref={formRef}
                        action={async (formData) => {
                            formData.set('base64File', file);
                            formData.set('fileName', name);
                            await formAction(formData);
                        }}
                    >
                        <div 
                            onDrop={onDropFiles}
                            onDragOver={dragOver}
                            className="flex justify-center items-center w-full min-h-[150px] border border-gray-300 rounded-lg"
                        >
                            {file ? (
                                <div className="relative w-[120px] h-[120px] flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl">
                                    <p className="font-bold text-sm text-gray-700 px-6 truncate w-full">
                                        {name || 'docx 파일'}
                                    </p>
                                    <button 
                                        type="button"
                                        onClick={handleReset}
                                        className="absolute right-2 top-2"
                                    >
                                        <XCircleIcon className="w-7 h-7 text-gray-700" />
                                    </button>
                                </div>
                            ) : (
                                <label 
                                    htmlFor="input-file"
                                    className="w-full min-h-[150px] flex items-center justify-center cursor-pointer"
                                >
                                    <span className="font-bold text-sm text-gray-600">
                                        파일을 업로드 혹은 드래그 해주세요
                                    </span>
                                </label>
                            )}
                        </div>

                        <input
                            id="input-file"
                            name="photo_file"
                            type="file"
                            accept=".docx"
                            onChange={onClickFileUpload}
                            className="absolute w-px h-px overflow-hidden clip-0 whitespace-nowrap border-0"
                        />

                        {file && <SubmitButton />}

                        {state.error && (
                            <p className="mt-2 text-red-500">{state.error}</p>
                        )}

                        {state.success && (
                            <p className="mt-2 text-green-500">{state.success}</p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
    );
}
