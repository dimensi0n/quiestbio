import { Card } from "./Card"

export function Results({ actors, codes }) {
  return <div className="cards">
    { actors.map(actor => <Card key={actor.id} codes={codes} actor={actor} />)}
  </div>
}