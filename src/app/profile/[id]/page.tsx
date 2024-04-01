'use client'

function page({params}:any){
    return(
        <div className='flex flex-col items-center justify-center py-2 min-h-screen'>
            <h1>profile ID Page</h1>
             <h2 className="p-2 bg-blue-500 rounded text-white">{params.id}</h2>
        </div>
    )
}
export default page;