
import './App.css'
import {useEffect, useState} from "react";
interface Country {
    name: { common: string };
    region: string;
    capital?: string[];
    population: number;
    cca2: string;
}

const BASE = "https://restcountries.com/v3.1/all?fields=name,region,capital,population,cca2";


function App() {

    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

   useEffect(() => {
       setLoading(true);
       fetch(BASE)
           .then((res) => {
               if (!res.ok) throw new Error("Błąd pobierania danych");
               return res.json();
           })
           .then((data) => setCountries(data))
           .catch((err) => setError(err))
           .finally(() => setLoading(false));
   }, []);
   const kraje = countries.filter(country =>{
       const nazwa = country.name.common.toLowerCase().includes(searchText.toLowerCase());
       const region = filter ? country.region === filter : true
       return(nazwa && region)
   });

  return (
    <>
    <input type={"text"} placeholder={"szukaj"} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <select value={filter} onChange ={e =>setFilter(e.target.value)}>
            <option value={""}>Wszytkie</option>
            <option value={"Europe"}>Europa</option>
            <option value={"Asia"}>Azja</option>
            <option value={"Africa"}>Afryka</option>
            <option value={"Americas"}>Europa</option>
            <option value={"Oceania"}>Australia</option>
        </select>

        {loading && <p>Ładowanie danych</p>}


            {searchText ? (
                kraje.length > 0 ? (
                <ul>
            {kraje.map(country => (
                <li key={country.cca2}>
                    {country.name.common} - {country.region}
                </li>
            ))}
        </ul>
        ) : (
        <p>Brak wynikow</p>
                ) ): (
                    <p>wpisz nazwe kraju</p>
                )}

    </>
  )
}

export default App
