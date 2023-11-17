// <reference types="world-countries" />
import Countries from "./ countries";

const formattedCountries = Countries.map((country:any) => ({
    label: country.name.common,
    value: country.cca2,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
    subregion: country.subregion,
}));

const useCountries = () => {
    // console.log(countries)
    const getAll=()=> formattedCountries;

    const getByValue=(value:string)=> formattedCountries.find((country:any) => country.value === value);

    return { getAll, getByValue}
};

export default useCountries;

    