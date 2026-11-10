import { Link, useParams } from 'react-router-dom';
import { useNewsById } from '../hooks/useNews';
import { Loading } from '../components/Loading';

export const NewsDetail = () => {
    const { id } = useParams();
    const { data, loading, error } = useNewsById(id);

    if (loading) return <Loading />;
    if (error || !data)
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Noticia no encontrada.
            </div>
        );

    return (
        <article className="mx-auto max-w-3xl">
            <Link
                to="/noticias"
                className="mb-4 inline-block text-sm font-medium text-primary-600 hover:underline"
            >
                ← Volver a noticias
            </Link>
            <p className="text-sm text-gray-400">
                {new Date(data.published_at).toLocaleDateString('es-CL', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })}
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-gray-900">{data.title}</h1>
            {data.image_url && (
                <img
                    src={data.image_url}
                    alt={data.title}
                    className="mt-4 w-full rounded-xl object-cover"
                />
            )}
            <div className="prose prose-sm mt-6 max-w-none whitespace-pre-line text-gray-700">
                {data.content}
            </div>
        </article>
    );
};