import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Lifetime | Mortality-Aware OS',
        short_name: 'Lifetime',
        description: 'Stop drifting. Start living.',
        start_url: '/dashboard',
        display: 'standalone',
        background_color: '#F5F5F7',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
