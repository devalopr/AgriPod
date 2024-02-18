import {
    BeakerIcon,
} from '@heroicons/react/24/outline'



function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Info({dbData}: any) {

    const actions = [
        {
            title: 'PH',
            value:  dbData.ph || '...',
            href: '#',
            desc: 'pH in agriculture refers to soil acidity or alkalinity, crucial for nutrient availability and crop growth optimization.',
            icon: BeakerIcon,
            iconForeground: 'text-rose-700',
            iconBackground: 'bg-rose-50',
        },
        {
            title: 'Nitrogen',
            value:  dbData.nitrogen || '...',
            href: '#',
            desc: 'Nitrogen is a vital element essential for plant growth, playing a crucial role in the formation of proteins, chlorophyll, and DNA, and often supplemented through fertilizers to enhance crop yields',
            icon: BeakerIcon,
            iconForeground: 'text-rose-700',
            iconBackground: 'bg-rose-50',
        },
        {
            title: 'Phosphorous',
            value:  dbData.phosphorous || '...',
            href: '#',
            desc: 'Phosphorus is a key nutrient crucial for plant growth, involved in energy transfer, root development, and flower and fruit production, often supplemented through fertilizers to optimize crop yields.',
            icon: BeakerIcon,
            iconForeground: 'text-rose-700',
            iconBackground: 'bg-rose-50',
        },
        {
            title: 'Potassium',
            value:  dbData.potasium || '...',
            href: '#',
            desc: 'Potassium is an essential nutrient for plants, critical for functions like water regulation, enzyme activation, and overall plant health, often supplemented through fertilizers to improve crop quality and yield',
            icon: BeakerIcon,
            iconForeground: 'text-rose-700',
            iconBackground: 'bg-rose-50',
        },
        {
            title: 'Moisture',
            value:  dbData.moisture || '...',
            href: '#',
            desc: 'Moisture refers to the presence of water in the soil, critical for plant growth as it facilitates nutrient uptake, photosynthesis, and overall plant health, with optimal moisture levels varying depending on the crop and soil type.',
            icon: BeakerIcon,
            iconForeground: 'text-rose-700',
            iconBackground: 'bg-rose-50',
        },
        {
            title: 'Humidity',
            value:  dbData.humidity || '...',
            href: '#',
            desc: 'Humidity refers to the amount of water vapor present in the air, influencing plant transpiration rates, disease susceptibility, and overall plant growth, with optimal humidity levels varying depending on the specific needs of the plant species.',
            icon: BeakerIcon,
            iconForeground: 'text-rose-700',
            iconBackground: 'bg-rose-50',
        },
        {
            title: 'RainFall',
            value:  dbData.rainfall || '...',
            href: '#',
            desc: 'Rainfall refers to the amount of precipitation, typically water, that falls from the atmosphere to the Earths surface, playing a critical role in agriculture by providing essential water for crop growth and soil moisture replenishment, influencing planting schedules, irrigation requirements, and overall crop yields',
            icon: BeakerIcon,
            iconForeground: 'text-rose-700',
            iconBackground: 'bg-rose-50',
        },
    ]

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
            {actions.map((action, actionIdx) => (
                <div
                    key={action.title}
                    className={classNames(
                        actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                        actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                        actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                        actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                        'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                    )}
                >
                    <div>
                        <span
                            className={classNames(
                                action.iconBackground,
                                action.iconForeground,
                                'inline-flex rounded-lg p-3 ring-4 ring-white'
                            )}
                        >
                            <action.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <div className='flex items-center justify-center'>
                                    <div className='pt-2 p-2 text-4xl font-semibold text-green-800'>
                                        {action.value}
                                    </div>
                                </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            <a href={action.href} className="focus:outline-none">
                                {/* Extend touch target to entire panel */}
                                <span className="absolute inset-0" aria-hidden="true" />
                                {action.title}
                              
                            </a>
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">

                            {action.desc || '...'}
                        </p>
                    </div>
                    <span
                        className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                    >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                    </span>
                </div>
            ))}
        </div>
    )
}