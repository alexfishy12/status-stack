'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createService } from '@/actions/create-service'; // logic layer
import Modal from '@/components/ui/modal';


type FormValues = {
    name: string;
    url: string;
};

export default function TrackNewApp() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const { register, handleSubmit, setFocus, reset, formState: { errors } } = useForm<{ name: string; url: string}>();
    const [loading, setLoading] = useState(false);

    // Focus first field when modal opens
    useEffect(() => {
        if (show) {
            setFocus('name');
        }
    }, [show, setFocus]);

    // Focus first field with error after failed submit
    useEffect(() => {
        if (errors.name) {
            console.log("Name error");
            setFocus('name');
        } else if (errors.url) {
            console.log("URL error");
            setFocus('url');
        }
    }, [errors, setFocus]);

    function onCancel() {
        // hide modal
        setShow(false);
        // clear form
        reset();
    }

    const onSubmit = async (data: FormValues) => {
        setLoading(true);

        // validate form
        // input to db
        const result = await createService(data);
        setLoading(false);

        if (result.success) {
            alert(`${data["name"]} is now being tracked!`);
            // hide modal
            setShow(false);
            reset();
            router.refresh();
        } else {
            alert(`Failed: ${result.error}`);
        }
    }

    return (
        <>
            <button 
                onClick={() => setShow(true)} 
                className="bg-blue-700 rounded-lg px-3 py-2 font-bold text-white cursor-pointer"
            >
                Track New +
            </button>

            <Modal show={show}>
                {/* Modal Title */}
                <div className="heading3 border-b border-gray-400 pb-3 w-full text-center">
                    Track New App
                </div>
                
                {/* Modal Body */}
                <form className="flex flex-col gap-3" id="createService" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <div className="subheading3">Name</div>
                        <input
                            {...register('name', { required: 'App name is required' })}
                            placeholder=""
                            className="rounded border-2 p-1 border-gray-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <div className="subheading3">URL</div>
                        <input
                            type="url"
                            {...register('url', {
                            required: 'Website URL is required',
                            pattern: {
                                value: /^https?:\/\/[\w.-]+\.[a-z]{2,}/i,
                                message: 'Enter a valid URL',
                            },
                            })}
                            placeholder=""
                            className="rounded border-2 p-1 border-gray-400"
                        />
                        {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
                    </div>
                </form>
                {/* Modal Footer */}
                <div className="w-full border-t border-gray-400 pt-3 flex gap-3 items-center justify-end">
                    <button onClick={() => onCancel()} className="bg-gray-500 rounded-lg px-3 py-2 font-bold text-white cursor-pointer">Cancel</button>
                    <button type="submit" form="createService" className="bg-blue-700 rounded-lg px-3 py-2 font-bold text-white cursor-pointer">Save</button>
                </div>
            </Modal>
        </>
    );
}