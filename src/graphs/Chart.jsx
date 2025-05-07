 export  default function Chart({data}){
    return(
    <>
    <div className=" bg-black  w-[500px] h-auto self-start rounded-2xl p-3.5 text-gray">
                <div className='flex items-end rounded-4xl flex-row-reverse'>
                        {data.map((user) =>(
                            <>
                            <div className='border-1  mb-1  w-[7%] bg-green-600 ml-[1%]  text-sm vertical-rl flex items-center justify-center ' style={{ height: `${user.value * 20}px ` }}>
                                <div>
                                    <p key={user.id} className='vertical-rl text-[8px] flex items-center justify-center'>
                                        {user.value}
                                    </p>
                                </div>
                            </div>
                            </>
                        ))}
                </div>


                <div className='flex w-full flex-row-reverse'>
                        {data.map((user) =>(
                            <>
                            <p key={user.id} className='  w-[8%] flex text-[7px] items-center justify-center'>
                                {user.date}
                            </p>
                            </>
                        ))}
                </div>
   </div>
  </>
    );
}