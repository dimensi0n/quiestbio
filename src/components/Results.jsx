import { Card } from "./Card"

export function Results({ actors, token }) {
  return <div>
    { actors.map(actor => <Card key={actor.id} token={token} actor={actor} />)}
  </div>
}