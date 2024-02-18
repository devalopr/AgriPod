export default function Severity({ pest, value, stext, color }: any) {
    return (
       <div className="max-w-sm p-4 container mx-auto">
          <div className="text-base text-red-700 dark:text-red-500 font-semibold">SEVERITY ({pest}): <span style={{ "color": color, "fontWeight": "600px" }}>{stext}</span></div>
          <h2 className="text-8xl font-bold" style={{ "fontSize": "40px", "marginTop": "-5px" }}>{value}</h2>
          <div className="w-full bg-gray-200 rounded-full h-1 mb-4 dark:bg-gray-500">
             <div className={`bg-red-600 h-1 rounded-full dark:bg-red-500`} style={{ width: `${value}%` }}></div>
          </div>
       </div >
    )
 }