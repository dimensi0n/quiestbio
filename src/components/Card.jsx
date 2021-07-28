import { useEffect, useState } from 'react'
import './Card.css'

export function Card({ actor, codes }) {
  const [profession, setProfession] = useState(null)

  useEffect(() => {
    (async () => {
      if (actor.naf) {
        const code = actor.naf.length === 6 ? actor.naf  : `${actor.naf.slice(0,2)}.${actor.naf.slice(2)}`
        codes.forEach(c => c.code === code && setProfession(c.label))
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