// import Center from "./Center"
import { useState } from "react";
import Header from "./Header"

function Dashboard() {

  const [isBoardModalOpen, setIsBoardModalOpen] = useState<boolean>(false)
  
  return  <>
    <div>
      <Header isBoardModalOpen={isBoardModalOpen} setIsBoardModalOpen={setIsBoardModalOpen}/>
      {/* <Center/> */}
    </div>
  </>
}

export default Dashboard