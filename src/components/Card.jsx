import './Card.css'

export function Card({ actor }) {
  return <div className="card">
    <p className="name">{ actor.raisonSociale }</p>
    { actor.siteWebs.length > 0 ? <a href={actor.siteWebs[0].url}>Site internet</a> : ''}
    <p className="lieu">{ actor.adressesOperateurs[0].lieu } - { actor.adressesOperateurs[0].codePostal } { actor.adressesOperateurs[0].ville }</p>
    { actor.certificats[0].organisme ? <a className="certificat" href={ actor.certificats[0].url }>Certificat - { actor.certificats[0].organisme }</a> : '' }
  </div>
}