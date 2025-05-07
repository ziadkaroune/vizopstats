import { useState , useEffect} from 'react'
import ScatterChart from './graphs/ScatterChart'
import LineChart from './graphs/LineChart'
import countryExtension from './countries/countryExtension'
import Chart from './graphs/Chart'
import FlagCountry from './countries/FlagCountry'
import  viziostats from './assets/viziostats.svg'
import './App.css'
const extension = [
  { code: "af", country: "Afghanistan" },
  { code: "al", country: "Albania" },
  { code: "dz", country: "Algeria" },
  { code: "ao", country: "Angola" },
  { code: "ar", country: "Argentina" },
  { code: "au", country: "Australia" },
  { code: "at", country: "Austria" },
  { code: "bd", country: "Bangladesh" },
  { code: "be", country: "Belgium" },
  { code: "br", country: "Brazil" },
  { code: "ca", country: "Canada" },
  { code: "cn", country: "China" },
  { code: "co", country: "Colombia" },
  { code: "cz", country: "Czech Republic" },
  { code: "dk", country: "Denmark" },
  { code: "eg", country: "Egypt" },
  { code: "fr", country: "France" },
  { code: "de", country: "Germany" },
  { code: "gh", country: "Ghana" },
  { code: "gr", country: "Greece" },
  { code: "in", country: "India" },
  { code: "id", country: "Indonesia" },
  { code: "ir", country: "Iran" },
  { code: "iq", country: "Iraq" },
  { code: "ie", country: "Ireland" },
  { code: "il", country: "Israel" },
  { code: "it", country: "Italy" },
  { code: "jp", country: "Japan" },
  { code: "ke", country: "Kenya" },
  { code: "kr", country: "South Korea" },
  { code: "mx", country: "Mexico" },
  { code: "ma", country: "Morocco" },
  { code: "nl", country: "Netherlands" },
  { code: "ng", country: "Nigeria" },
  { code: "no", country: "Norway" },
  { code: "pk", country: "Pakistan" },
  { code: "pl", country: "Poland" },
  { code: "pt", country: "Portugal" },
  { code: "ru", country: "Russia" },
  { code: "sa", country: "Saudi Arabia" },
  { code: "za", country: "South Africa" },
  { code: "es", country: "Spain" },
  { code: "se", country: "Sweden" },
  { code: "ch", country: "Switzerland" },
  { code: "tr", country: "Turkey" },
  { code: "ua", country: "Ukraine" },
  { code: "gb", country: "United Kingdom" },
  { code: "us", country: "United States" },
  { code: "vn", country: "Vietnam" },
];
function App() {
  const [data, setData] = useState([]);
  const [amount ,setAmount] = useState(2023);
  const [clicked ,setClicked] = useState(true);
  const [clickeds ,setClickeds] = useState(true);
  const [country , setCountry] = useState("Poland");
        const fetchApi = async(e) =>{
          e.preventDefault();
          try{
                const code = countryExtension({country});
                if(code === "not found")
                      throw new Error("can't find the country");
                const response  = await fetch(`https://api.worldbank.org/v2/country/${code}/indicator/SL.UEM.TOTL.ZS?format=json&date=2010:${amount}`);
                if(!response)
                    throw new Error("error fetching api");
                const dataj = await response.json();
                let custom = dataj[1];
              
                    
                setData(custom);
          }
          catch(error){
                console.error(error);
          }
        }
   useEffect(()=>{
    if (country) fetchApi({ preventDefault: () => {} });
   },[amount])   

  return (
    <>
    <div className='flex m-0 w-screen bg-black-400'>
    <div className='w-1/5 bg-black flex justify-center'>
  
    <div className='text-sm flex flex-col justify-around h-screen w-full'>
      <div className='flex  justify-center'>viziostats</div>
      <div >
        <div className=''>
        <div className='flex justify-around'>
           <span className=' w-[50px] text-[8px] rounded-xl p-2 mr-1'>2010</span>
          <span className=' w-[50px] text-[8px] rounded-xl p-2  mr-1'>{amount}</span>
          </div>
      < span > 
        <input className='border-2 rounded-2xl p-1 mb-3 w-[80%]' type='range' min="2010" max="2023" placeholder='amount' value={amount} onChange={(e)=>setAmount(e.target.value)} /> 
       
        </span></div>
      <form onSubmit={fetchApi}>
        <div className=''>
                      <h4 className='mb-2'>country</h4>
                      <span> 
                          <select className='w-2/3 p-1 px-1 rounded-2xl mb-3 bg-gray-950' value={country}   onChange={(e) => setCountry(e.target.value)}>
                                  <option value="">Select a country</option>
                                  {extension.map((code) =>(<><option key={code.id} value={code.country}>{code.country}</option></>))}
                           </select>
                      </span>
          </div>
                <div className='bg-green-600 py-18 flex flex-col flex-wrap items-center m-10 rounded-2xl'>
                <h2 className='font-bold'>Graphs</h2>
              <div className='mt-6 flex text-[9px] flex-wrap items-center justify-center'>
              <button onClick={()=>setClicked(prev => !prev)}className=' bg-green-500 w-[80px] text-[5px] p-2 border-1 mr-1'>LineChart</button>
              <button onClick={()=>setClickeds(prev => !prev)}className=' bg-green-500 w-[80px]  p-2 border-1'>ScatterChart</button>
              </div>
              </div>
                <button className='border-1 rounded-2xl bg-black ' type='submit'>search</button>
     </form>
   </div>
   <div className=''>source : worldbank.org</div>
   </div>
 
    </div>

    
    <div className='  w-4/5  mx-auto  h-auto flex flex-wrap   p-8 bg-black-500' >
    <div className='h-screen'>
    <Chart data={data} className='relative'/>
 {clickeds ?(
       <div className='mt-2 mb-1 bg-black rounded-xl py-2 self-start'><LineChart dataPoints={data} /></div>) : ''}
  <div className=' bg-black h-1/5  mt-2  rounded-xl py-2 self-start justify-center flex items-center'>
  
  
  <FlagCountry countryCode={countryExtension({country})} />
    <h1 className='bolder ml-2'>{country}</h1>
  </div>
  </div>
  <div className='ml-4 w-1/2'>
  {clicked ?(
       <div className=' bg-black w-full rounded-xl py-2'><ScatterChart dataPoints={data}/></div>) : ''}
  </div>
  
  </div>
 

       </div>
    </>
   
  )
}

export default App
