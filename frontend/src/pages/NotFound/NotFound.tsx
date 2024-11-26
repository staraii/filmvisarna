import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Ojdå!</h1>
      <p>Sidan du försökte nå finns inte</p>
      <Button type="button" variant="outline-secondary" onClick={() => navigate(-1)}>Tillbaka</Button>
    </div>
  )
}