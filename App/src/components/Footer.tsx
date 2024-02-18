import { ChartPieIcon, AcademicCapIcon, ChatBubbleLeftRightIcon, XMarkIcon, ArrowUpTrayIcon, ShoppingBagIcon, PaperAirplaneIcon, MegaphoneIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
   return (
      <div className="fixed w-full bg-white z-100 " style={{ "bottom": "0px", "boxShadow": "rgba(0, 0, 0, 0.1) 0px 10px 50px" }}>
         <nav className="flex items-center justify-center p-1">
            <div className="flex items-center">

               <a className="p-5" href="/monitor">
                  <ChartPieIcon className="w-6 h-6" />
               </a>

               <a className="p-5" href="/base">
                  <AcademicCapIcon className="w-6 h-6" />
               </a>

               {/* <a className="p-5" href="/chat">
                  <ChatBubbleLeftRightIcon className="w-6 h-6" />
               </a> */}

               <a className="p-5" href="/drone">
                  <PaperAirplaneIcon className="w-6 h-6" />
               </a>
               <a className="p-5" href="/scheme">
                  <MegaphoneIcon className="w-6 h-6" />
               </a>
               <a className="p-5" href="/marketplace">
                  <ShoppingBagIcon className="w-6 h-6" />
               </a>
               <a className="p-5" href="/analyze">
                  <PresentationChartBarIcon className="w-6 h-6" />
               </a>
            </div>
         </nav>
      </div>
   );
};
