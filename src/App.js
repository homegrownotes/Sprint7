import { data } from "./assets/data";
import { Checkbox } from "./components/Checkbox";

export default function App() {
  return (
    <div>
      <h3>¿Qué quieres hacer?</h3>
      <Checkbox data={data} />
    </div>
  );
}
