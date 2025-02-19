import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [selectedSort, setSelectedSort] = useState("population");
  const [search, setSearch] = useState("");
  const [seleccion, setSeleccion] = useState("independent");
  const navigate = useNavigate()
  const regions = [
    "Americas",
    "Antarctic",
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
  ];
  const [selected, setSelected] = useState(["Americas", "Europe"]);

  const toggleRegion = (region) => {
    setSelected((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);
        const json = await response.json();
        setCountries(json);
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, []);

  const filteredCountries = useMemo(() => {
    let filtered = [...countries];

    if (seleccion === "independent") {
      filtered = filtered.filter((c) => c.independent);
    } else if (seleccion === "member") {
      filtered = filtered.filter((c) => !c.independent);
    }

    filtered = filtered.filter((c) =>
      selected.some((region) => region.toLowerCase() === c.region.toLowerCase())
    );

    const searchLower = search.toLowerCase();
    if (searchLower) {
      filtered = filtered.filter(
        (c) =>
          c.name.common.toLowerCase().includes(searchLower) ||
          c.subregion?.toLowerCase().includes(searchLower)
      );
    }

    switch (selectedSort) {
      case "population":
        return [...filtered].sort((a, b) => b.population - a.population);
      case "name":
        return [...filtered].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      case "area":
        return [...filtered].sort((a, b) => b.area - a.area);
      default:
        return filtered;
    }
  }, [countries, seleccion, selected, search, selectedSort]);

  return (
    <div className="country_data">
      <h3 className="found">Found {filteredCountries.length} countries</h3>
      <div className="search">
        <i></i>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
          type="text"
          placeholder="Search by Name, Region, Subregion"
        />
      </div>
      <aside className="form">
        <label htmlFor="sortBy">Sort By</label>
        <select
          defaultValue={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="population">Population</option>
          <option value="name">Name</option>
          <option value="area">Area</option>
        </select>

        <div className="container">
          <label>Region</label>
          <div className="button-container">
            {regions.map((region) => (
              <button
                key={region}
                className={`toggle-button ${
                  selected.includes(region) ? "active" : ""
                }`}
                onClick={() => toggleRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <label className="status" htmlFor="status">
          Status
        </label>
        <div className="radio">
          <input
            type="checkbox"
            checked={seleccion === "member"}
            onChange={() => setSeleccion("member")}
            name="status"
            id="member"
            aria-checked={seleccion === "member"}
            role="radio"
          />
          <label htmlFor="member">Member of the United Nations</label>
        </div>
        <div className="radio">
          <input
            type="checkbox"
            checked={seleccion === "independent"}
            onChange={() => setSeleccion("independent")}
            name="status"
            aria-checked={seleccion === "independent"}
            role="radio"
            id="independent"
          />
          <label htmlFor="member">Independent</label>
        </div>
      </aside>
      <table className="table">
        <thead>
          <tr>
            <th id="flag">Flag</th>
            <th>Name</th>
            <th>Population</th>
            <th>
              Area (km<span id="super_index">2</span>)
            </th>
            <th className="region">Región</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries?.length > 0 &&
            filteredCountries.map((country) => (
              <tr key={country.cca3} onClick={() =>  navigate(country.cca3)}>
                <td className="flag">
                  <img src={country.flags.svg} alt={country.name.common} />
                </td>
                <td className="name">{country.name.common}</td>
                <td>{country.population.toLocaleString("en-US")}</td>
                <td>{country.area.toLocaleString("en-US")}</td>
                <td className="region">{country.region}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryList;
