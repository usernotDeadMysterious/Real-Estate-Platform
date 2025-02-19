import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image'
  
function Slider({imageList,listingDetail }) {
    console.log(listingDetail?.type)
  return (
    <div className='pt-3 '>
      
        {/* Badge for Rent/Sale */}
      
      
      {imageList?(
      <Carousel>
        <CarouselContent>
            {imageList.map((item,index)=>(

                <CarouselItem key={item.url} >
                    <div className='flex relative'>
                      <Image src={item.url} width={800} height={300} alt='image' className='rounded-xl object-contain h-[400px]  w-full '/>
                      {listingDetail?.type && (
                      <div className="absolute top-14 left-4 bg-blue-600 text-white px-3 py-1 text-sm font-bold rounded-lg shadow-md z-10">
                        {listingDetail.type === "Rent" && "For Rent"}
                        {listingDetail.type === "Sell" && "For Sale"}
                      </div>
                      )}
                    </div>
                    
                    

                </CarouselItem>
            ))}
            
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>


        ):(<div className='w-full h-[200px] bg-slate-200 animate-pulse rounded-lg'>

        </div>
        )}

    </div>
  )
}

export default Slider
