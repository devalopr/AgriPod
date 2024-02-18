import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function Modal({data, isOpen, setIsOpen}) {

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-5 w-[90vw] max-w-[500px]">
          <div className="flex items-center justify-between mb-3">
          <Dialog.Title className={"font-medium text-xl"}>Analyzed results</Dialog.Title>
            <button className='p-1 bg-gray-100 rounded-full' onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

            </button>
          </div>

        <h4 className='text-md mb-5'>Best crop to grow is <br /> <strong>  {data?.crop_name} </strong></h4>
          <div className="flex justify-betwee flex-wrap gap-5">

          {data && Object.keys(data).map((key, index) => (
              index !== 0 && 
              <div key={index} className='mb-2 w-[140px]'>
                        <strong className='tracking-wide uppercase text-xs text-violet-900'>{key.replace("_", " ")} </strong>
                        <br />
                        {data[key]}
                        </div>
                ))}
                </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}