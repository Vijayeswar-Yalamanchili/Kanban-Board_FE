import AddEditBoardModal from "../modals/AddEditBoardModal"
import Header from "./Header"

interface Props {
  type :string,
  isBoardModalOpen : boolean,
  setIsBoardModalOpen : React.Dispatch<React.SetStateAction<boolean>>,
}

function EmptyBoard({type, isBoardModalOpen, setIsBoardModalOpen} : Props) {

  return <>
    <Header isBoardModalOpen={false} setIsBoardModalOpen={setIsBoardModalOpen}/>
    <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
      <h3 className=" text-gray-500 font-bold">
        {
          type === "edit"
            ? "This board is empty. Create a new column to get started."
            : "There are no boards available. Create a new board to get started"
        }
      </h3>
      <button onClick={() => {setIsBoardModalOpen(true)}} className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full">
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {
        isBoardModalOpen && <AddEditBoardModal boardCreateType={type} setIsBoardModalOpen={setIsBoardModalOpen}/>
      }
    </div>
  </>
}

export default EmptyBoard