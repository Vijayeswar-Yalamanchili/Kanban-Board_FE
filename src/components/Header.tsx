import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/logo.svg'
import iconUp from '../assets/dropDownUp.svg'
import iconDown from '../assets/dropDownDown.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import HeaderDropDown from './HeaderDropDown'
import AddEditBoardModal from '../modals/AddEditBoardModal'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/Store'
import AddEditTaskModal from '../modals/AddEditTaskModal'

interface Props {
    isBoardModalOpen : boolean,
    setIsBoardModalOpen :React.Dispatch<React.SetStateAction<boolean>>
}

function Header({setIsBoardModalOpen, isBoardModalOpen} : Props) {

    const [boardCreateType, setBoardCreateType] = useState<string>("add");
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)
    const [ellipsisMenu, setEllipsisMenu] = useState<boolean>(false)
    const [openEllipsisMenu, setOpenEllipsisMenu] = useState<boolean>(false)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const boards = useSelector((state :RootState) => state.board.boards)
    const boardHeader = boards.find(board => board.isActive)
    // const dispatch = useDispatch()

    const handleDropDown = () => {
        setOpenDropDown(!openDropDown)
        setEllipsisMenu(false)
    }

    const handleCreateTask = () => {
        setIsTaskModalOpen(state => !state)
        setOpenDropDown(false)
    }

    const handleEllipsisMenu = () => {
        setOpenEllipsisMenu(!openEllipsisMenu)
        setEllipsisMenu(!ellipsisMenu)
        setBoardCreateType("add")
    }

    return <>
        <div className='p-4 '>
            <header className='flex justify-between'>
                <div className='flex w-1/2 space-x-2 justify-start md:justify-between items-center'>
                    <div className='flex items-center space-x-2'>
                        <img src={logo} alt="logo" className='h-6 w-6' />
                        <h3 className='text-2xl hidden md:block'>KanbanFlow</h3>
                    </div>
                    <div className='flex justify-start items-center space-x-1'>
                        <h3 className='text-xl'>{boardHeader?.name}</h3>
                        <img src={openDropDown ? iconUp : iconDown} onClick={handleDropDown} alt="dropdownIcon" className='cursor-pointer md:hidden w-2.25 h-2.25 '/>
                    </div>
                </div>
                <div className='flex justify-center items-center space-x-5'>
                    <button onClick={handleCreateTask} className='newTaskbutton text-lg hidden md:block px-2 py-1.5 text-white m-1 w-32 rounded-lg bg-purple-600'><span className='me-2'><FontAwesomeIcon icon={faPlus}/></span>Add Task</button>
                    <button onClick={handleCreateTask} className='newTaskbutton md:hidden p-0 m-1 w-10 h-10 rounded-full bg-purple-600'><FontAwesomeIcon icon={faPlus}/></button>
                    <div className='pe-2 cursor-pointer' onClick={handleEllipsisMenu}><FontAwesomeIcon icon={faEllipsisVertical}/></div>
                </div>
            </header>
        </div>

        {
            openDropDown && <HeaderDropDown setOpenDropDown={setOpenDropDown} setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen}/>
        }

        {
            isBoardModalOpen && <AddEditBoardModal boardCreateType={boardCreateType} setIsBoardModalOpen={setIsBoardModalOpen}/>
        }

        {
            isTaskModalOpen && <AddEditTaskModal setIsTaskModalOpen={setIsTaskModalOpen} taskType="add" device="mobile"/>
        }
    </>
}

export default Header