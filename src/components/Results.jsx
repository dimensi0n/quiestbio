import { Card } from "./Card"

export function Results({ actors }) {
  return <div>
    { actors.map(actor => <Card key={actor.id} actor={actor} />)}
  </div>
}