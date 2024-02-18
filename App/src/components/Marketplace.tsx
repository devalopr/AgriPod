import { useEffect, useState } from "react";
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Services from "./Services";
import { getDatabase, onValue, ref } from "firebase/database";

export default function Marketplace() {

    const navigation = [
        { name: 'About', href: '#' },
        { name: 'Features', href: '#' },
    ]

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [dbData, setData] = useState({}) as any;

    console.log(dbData)

    useEffect(() => {

        const getData = () => {
            const database = getDatabase();
            // Point to the root or a specific part of your database

            const dataRef = ref(database);

            onValue(dataRef, (snapshot) => {
                const dbData: any = snapshot.val();
                setData(dbData)
                console.log(dbData)
            }, {
                onlyOnce: false
            });

        }
        getData()
    }, []);

    const jsonData = [{"commodity": "tomato", "price":"₹100", "seller": "Kumaran P.K."},
    {"commodity": "Potato", "price":"₹200", "seller": "Damodaran P.K."}];

    const parsedData = jsonData;
    return (

        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">AgriPod</span>
                            <a href="/">
                                <svg width="36" height="36" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.9532 1C16.5019 1 21 5.47715 21 11C21 16.5228 16.5019 21 10.9532 21C-1.6311 21 -2.82658 3.01755 10.4985 4C13.8499 4.2471 17.0289 7.41015 17.0289 11C17.0289 15.5 14.2348 17.5 10.4985 17.5C3.5 17.5 2.19042 7.46691 10.0021 8C11.508 8.10276 13.0162 9.34315 13.0162 11C13.0162 12.9278 12 14 10.1211 14" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Services />
                        {/* {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
            {item.name}
          </a>
        ))} */}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="signin" className="text-sm font-semibold leading-6 text-gray-900">
                            Sign in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">AgriPod</span>
                                <a href="/">
                                    <svg className='h-8 w-8' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.9532 1C16.5019 1 21 5.47715 21 11C21 16.5228 16.5019 21 10.9532 21C-1.6311 21 -2.82658 3.01755 10.4985 4C13.8499 4.2471 17.0289 7.41015 17.0289 11C17.0289 15.5 14.2348 17.5 10.4985 17.5C3.5 17.5 2.19042 7.46691 10.0021 8C11.508 8.10276 13.0162 9.34315 13.0162 11C13.0162 12.9278 12 14 10.1211 14" stroke="#D4D7E0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />

                                    </svg>
                                </a>
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 py-4 pt-10">
                    <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
                    <div className="grid grid-cols-1 gap-4">
                        {parsedData.map((data, index) => (
                            <div key={index} className="p-4 border border-gray-300 rounded-lg">
                                <h2 className="text-xl font-bold mb-2">{data.commodity}</h2>
                                <p className="text-gray-600">{data.price}</p>
                                <p className="text-gray-600 mb-5">Sold by <b> {data.seller} </b></p>

                                <a href="https://wa.me/7025111127" className=" py-2 px-5 bg-green-600 rounded-md text-white">Buy</a>

                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>


    )
}
