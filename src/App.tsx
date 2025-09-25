
import './App.css'
import {useEffect, useState} from "react";
import Lista from "./List.tsx";
import type {Country} from "./CountryInterface.tsx";

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
           .catch((err) => setError(err.message))
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
            <option value={"Americas"}>Ameryka</option>
            <option value={"Oceania"}>Australia</option>
        </select>

        {loading && <p>Ładowanie danych</p>}
        {error && <p>{error}</p>}

        <Lista countries={kraje} onSelect={(country: Country) => setSelectedCountry(country)}/>



        {selectedCountry && (
            <div>
                <h2>{selectedCountry.name.common}</h2>
                <p>Region: {selectedCountry.region}</p>
                <p>Stolica: {selectedCountry.capital}</p>
                <p>Populacja: {selectedCountry.population}</p>
                <button onClick={() => setSelectedCountry(null)}>zamknij</button>
            </div>
        )}

    </>
  )
}

export default App
