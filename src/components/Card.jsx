import axios from 'axios'
import { useEffect, useState } from 'react'
import './Card.css'

export function Card({ actor, token }) {
  const [profession, setProfession] = useState(null)

  useEffect(() => {
    (async () => {
      if (actor.naf && token) {
        const res = await axios.get(`https://api.insee.fr/metadonnees/V1/codes/nafr2/sousClasse/${actor.naf}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setProfession(res.data.intitule)
      }
    })()
  })
  return <div className="card">
    <p className="name">{ actor.raisonSociale }</p>
    { actor.siteWebs.length > 0 ? <a href={actor.siteWebs[0].url}>Site internet</a> : ''}
    <p className="lieu">{ actor.adressesOperateurs[0].lieu } - { actor.adressesOperateurs[0].codePostal } { actor.adressesOperateurs[0].ville }</p>
    <p>{profession}</p>
    { actor.certificats[0].organisme ? <a className="certificat" href={ actor.certificats[0].url }>Certificat - { actor.certificats[0].organisme }</a> : '' }
  </div>
}