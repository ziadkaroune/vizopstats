// components/FlagSection.jsx
export default function FlagCountry({ countryCode }) {
    if (!countryCode) return null;
    
    const lowerCode = countryCode.toLowerCase();
    const flagUrl = `https://flagcdn.com/w320/${lowerCode}.png`;
  
    return (
    <>
        <img src={flagUrl} alt={`Flag of ${countryCode}`} className="w-20 h-auto rounded   shadow-lg" />
    </>
    );
  }
  