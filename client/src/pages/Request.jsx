import { useParams } from "react-router-dom";

export default function Request() {
  const { id } = useParams();
  return <div>single booking: {id}</div>;
}
