// src/components/InstallPWA.tsx
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'pwa-install-dismissed';

export const InstallPWA = () => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSModal, setShowIOSModal] = useState(false);

    useEffect(() => {
        // Detectar iOS
        const ua = window.navigator.userAgent.toLowerCase();
        const ios = /iphone|ipad|ipod/.test(ua);
        const isStandalone = window.matchMedia(
            '(display-mode: standalone)'
        ).matches;
        const dismissed = localStorage.getItem(DISMISS_KEY);

        setIsIOS(ios);

        // Solo mostrar si no está instalada y no fue descartada
        if (isStandalone || dismissed) return;

        if (ios) {
            // En iOS mostramos banner propio después de 5s
            setTimeout(() => setShowBanner(true), 5000);
        }

        // Android/Chrome
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowBanner(true);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (isIOS) {
            setShowIOSModal(true);
            return;
        }

        if (!deferredPrompt) return;

        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setShowBanner(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        localStorage.setItem(DISMISS_KEY, '1');
        setShowBanner(false);
        setShowIOSModal(false);
    };

    if (!showBanner && !showIOSModal) return null;

    return (
        <>
            {/* Banner inferior */}
            {showBanner && !showIOSModal && (
                <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md animate-[slideUp_0.3s_ease-out] rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:inset-x-auto sm:right-6">
                    <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-600">
                            <img
                                src="/web-app-manifest-192x192.png"
                                alt="Altamira"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">
                                Instala el Portal Altamira
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                                Accede rápido desde tu pantalla de inicio
                            </p>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="mt-3 flex gap-2">
                        <button
                            onClick={handleInstall}
                            className="flex-1 rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                        >
                            Instalar
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Ahora no
                        </button>
                    </div>
                </div>
            )}

            {/* Modal instrucciones iOS */}
            {showIOSModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
                    onClick={handleDismiss}
                >
                    <div
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-3xl">
                                📱
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Instalar en iPhone
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Sigue estos pasos para añadir Altamira a tu pantalla de inicio
                            </p>
                        </div>

                        <ol className="mt-5 space-y-3 text-sm text-gray-700">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                                    1
                                </span>
                                <span>
                                    Toca el botón <strong>Compartir</strong>{' '}
                                    <span className="inline-block">⬆️</span> en Safari
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                                    2
                                </span>
                                <span>
                                    Desplázate y selecciona{' '}
                                    <strong>"Añadir a pantalla de inicio"</strong>
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                                    3
                                </span>
                                <span>
                                    Toca <strong>"Añadir"</strong> arriba a la derecha
                                </span>
                            </li>
                        </ol>

                        <button
                            onClick={handleDismiss}
                            className="mt-6 w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};