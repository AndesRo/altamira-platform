import { ReactNode } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'md' | 'lg';
}

export const Modal = ({
    open,
    onClose,
    title,
    children,
    size = 'md',
}: ModalProps) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-12"
            onClick={onClose}
        >
            <div
                className={`w-full ${size === 'lg' ? 'max-w-3xl' : 'max-w-xl'
                    } rounded-xl bg-white shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
};