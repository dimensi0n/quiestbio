import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import { Results } from './components/Results';

function App() {
  const [city, setCity] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [inseeToken, setInseeToken] = useState(JSON.parse(sessionStorage.getItem('insee_token')))

  useEffect(() => {
    (async () => {
      try {
        const hasToBeRenew = inseeToken ?  JSON.parse(sessionStorage.getItem('insee_token')).until < new Date() : true
        if (hasToBeRenew) {
          let res = await axios.post('http://localhost:8080/https://api.insee.fr/token?grant_type=client_credentials', {}, {
            headers: {
              'Authorization': `${process.env.REACT_APP_INSEE_SECRET}`,
              'origin': 'localhost',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          const token = res.data.access_token
          let until = new Date()
          until.setHours(until.getHours() + 24)

          setInseeToken({token, until})
          sessionStorage.setItem('insee_token', JSON.stringify({until, token}))
        }
      } catch (e) {
        console.error(e)
      }
  
    })()
  }, [inseeToken, setInseeToken])

  useEffect(() => {
    const typing = setTimeout(async () => {
      if (city.length > 4) {
        setIsLoading(true)
        let res = await axios.get(`https://opendata.agencebio.org/api/gouv/operateurs?q=${city}`)
        res = res.data.items.map(actor => { return { id: actor.id, raisonSociale: actor.raisonSociale, siteWebs: actor.siteWebs, adressesOperateurs: actor.adressesOperateurs, certificats: actor.certificats, naf: actor.codeNAF } })
        if (city.length > 0) {
          setResults(res)
        }
        setIsLoading(false)
      } else {
        setResults([])
        setIsLoading(false)
      }
    }, 500)

    return () => clearTimeout(typing)
  }, [city])

  const handleChange = (e) => setCity(e.target.value)

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.svg" className="App-logo" alt="Logo de qui est bio" />
        <p className="label">Données fournies par <a className="link" href="https://www.agencebio.org/">l'Agence Bio</a></p>
      </header>
      <section className="form">
        <input name="city" value={city} onChange={handleChange} placeholder="Rentre le nom de ta ville (4 lettres min.)"/>
      </section>
      <section className="results">
        { isLoading ? <div className="loading"><img src="/loading-grey.gif" alt="Icône de chargement"/></div> : ''}
        { results.length > 0 ? <Results token={inseeToken ? inseeToken.token : 0} actors={results}/> : <p className="empty">Rentrez le nom de votre ville et découvrez les acteurs du bio autour de chez vous</p>}
      </section>
      <footer>
        <p>Réalisé par <a className="link" href="https://erwanroussel.consulting">Erwan ROUSSEL</a></p>
      </footer>
    </div>
  );
}

export default App;
