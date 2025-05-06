'use client';

interface ModalProps  {
    show: boolean;
    children: React.ReactNode;
};

export default function Modal({show, children}: ModalProps) {
    if (!show) return null;
    //console.log("Modal mounted")
    return (
        
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg flex flex-col gap-2 items-center justify-center">
                {children}
            </div>
        </div>
    );
}