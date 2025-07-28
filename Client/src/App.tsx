import { useState } from "react";
import AddPost from "./components/AddPost";
import Button from "./components/Button";
import Card from "./components/Card";
import PlusIcon from "./components/PlusIcon";
import ShareIcon from "./components/ShareIcon";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <div className="flex justify-between relative">
              <Sidebar />

              <Card />
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  open={open}
                  setOpen={setOpen}
                  content="Add Post"
                  icon={<PlusIcon />}
                />
                <Button
                  variant="secondary"
                  content="Share"
                  icon={<ShareIcon />}
                />
              </div>
              <AddPost open={open} setOpen={setOpen} />
            </div>
          }
        />
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Signin" element={<Signin/>}/>
      </Routes>
    </>
  );
}

export default App;
