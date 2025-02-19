import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const Country = () => {
  const [pais, setPais] = useState(null);
  const [languages, setLanguage] = useState();
  const [neig, setNeigh] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${params.code}`
        );
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);
        const json = await response.json();

        setPais(json[0]);
        setLanguage(Object.values(json[0].languages));
      } catch (error) {
        navigate("/");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (pais !== null) {
      const getData = async () => {
        try {
          const response = await fetch(
            `https://restcountries.com/v3.1/alpha/?codes=${pais.borders}`
          );
          if (!response.ok)
            throw new Error(`Response status: ${response.status}`);
          const json = await response.json();
          console.log(json);
          setNeigh(json);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [pais]);

  return (
    <div className="country_info">
      {pais !== null && (
        <div>
          <img className="country_main" src={pais.flags.svg} alt="" />
          <h1>{pais.name.common}</h1>
          <p style={{ margin: 0 }}>{pais.name.official}</p>
          <div className="info">
            <div className="cuanti">
              Population <hr /> {pais.population.toLocaleString("en-US")}
            </div>
            <div className="cuanti">
              Area (km²) <hr /> {pais.area.toLocaleString("en-US")}
            </div>
          </div>
          <div className="information">
            <p>Capital</p>
            <p>{pais.capital}</p>
          </div>
          <div className="information">
            <p>subregion</p>
            <p>{pais.subregion}</p>
          </div>
          <div className="information">
            <p>Languaje</p>
            <p>{languages !== null && languages.join(", ")}</p>
          </div>
          <div className="information">
            <p>Currencies</p>
            {Object.values(pais.currencies).map((e) => (
              <p key={e.name}>{e.name}</p>
            ))}
          </div>
          <div
            className="information"
            style={{ borderBottom: "1px solid #282B30" }}
          >
            <p>Continents</p>
            <p>{pais.region}</p>
          </div>
          <div className="neigh">
            <p>Neighbouring Countries</p>
            <div>
              {neig !== null &&
                neig.map((e) => (
                  <div key={e.name.common} className="neighbours">
                    <img src={e.flags.svg} alt="" />
                    <p>{e.name.common}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Country;
