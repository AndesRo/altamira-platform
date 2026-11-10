export const Loading = ({ message = 'Cargando...' }: { message?: string }) => (
    <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
            <p className="text-sm text-gray-500">{message}</p>
        </div>
    </div>
);