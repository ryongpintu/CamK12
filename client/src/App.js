
import { BrowserRouter as Router, Route} from "react-router-dom";

import Join from './components/join';
import Teacher from './components/Teacher/teacher';
import Student from './components/Student/student';
import Invite from "./components/Invite/Invite";

function App() {
  return (
    <div className="App">
     <Router>
     <Route exact path="/" component={Join} />
    <Route exact path="/invite" component={Invite} />
     <Route exact path="/student" component={Student} />
     <Route exact path="/teacher" component={Teacher} />
     </Router>     
    </div>
  );
}

export default App;
