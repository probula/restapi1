import type {Country} from "./CountryInterface.tsx";
interface Dane{
    countries: Country[];
    onSelect: (country: Country) => void;
}

const Lista = ({ countries, onSelect }: Dane) => {
    return(
        <ul style={{"listStyleType": "none"}}>
            {countries.length == 0 ? (
                <p>Brak wyników</p>
            ) : (
                countries.map((country: Country) => (
                    <li key={country.cca2}>
                        {country.name.common} - {country.region}
                        <button onClick={() => onSelect(country)}>pokaż szczegóły</button>
                    </li>
                ))
            )}
        </ul>
    )
}

export default Lista

