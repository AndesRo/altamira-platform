export const Contact = () => {
    const whatsappGroup = 'https://chat.whatsapp.com/TU-CODIGO-DE-GRUPO';

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Contacto</h1>
                <p className="text-sm text-gray-500">
                    Canales oficiales de comunicación de la comunidad.
                </p>
            </header>

            <section className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 font-bold text-gray-900">Administración actual</h2>
                <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                        <span className="text-lg">📞</span>
                        <div>
                            <p className="font-medium text-gray-800">Teléfono</p>
                            <a href="tel:+56900000000" className="text-primary-600 hover:underline">
                                +56 9 0000 0000
                            </a>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-lg">✉️</span>
                        <div>
                            <p className="font-medium text-gray-800">Correo</p>
                            <a
                                href="mailto:administracion@altamira.cl"
                                className="text-primary-600 hover:underline"
                            >
                                administracion@altamira.cl
                            </a>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-lg">🕘</span>
                        <div>
                            <p className="font-medium text-gray-800">Horario de atención</p>
                            <p className="text-gray-600">Lunes a viernes, 09:00 a 18:00 hrs</p>
                        </div>
                    </li>
                </ul>
            </section>

            <section className="rounded-xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
                <h2 className="mb-2 font-bold text-emerald-900">
                    Grupo de WhatsApp comunitario
                </h2>
                <p className="mb-4 text-sm text-emerald-800">
                    Únete al grupo oficial de vecinos para avisos y coordinación.
                </p>
                <a
                    href={whatsappGroup}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white hover:bg-emerald-700"
                >
                    💬 Unirme al grupo
                </a>
            </section>
        </div>
    );
};