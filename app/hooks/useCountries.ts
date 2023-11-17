

import countries from "world-countries";


const formattedCountries = countries.map((country) => ({
    label: country.name.common,
    value: country.cca2,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
    subregion: country.subregion,
}));

const useCountries = () => {
    const getAll=()=> formattedCountries;

    const getByValue=(value:string)=> formattedCountries.find((country) => country.value === value);

    return { getAll, getByValue}
};

export default useCountries;

    