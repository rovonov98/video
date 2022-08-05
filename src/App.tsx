import { useGetEventsByIdQuery } from "@redux/queries";
import VideoPlayer from "./components/VideoPlayer";
import Events from "components/Events";

import "./App.css";

function App() {
  const { data: events } = useGetEventsByIdQuery("5e60c5f53300005fcc97bbdd");
  return (
    <div className="App">
      <VideoPlayer events={events || []} />
      <Events events={events || []} />
    </div>
  );
}

export default App;
