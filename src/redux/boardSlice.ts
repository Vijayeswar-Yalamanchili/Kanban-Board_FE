import { createSlice } from "@reduxjs/toolkit"
import data from '../data.json'

export interface SubTaskData {
    // id : number | "",
    title : string,
    isCompleted : boolean
}

export interface TaskData {
    // id : number | "",
    title : string,
    description : string,
    status : string
    subtasks : SubTaskData[],
    selectedPriority : string,
    assigneeName : string,
    dueDate : string,
}

export interface ColumnData {
    // id : number | "",
    name : string,
    tasks : TaskData[]
}

export interface BoardData {
    // id : number | "",
    name : string,
    isActive : boolean,
    columns : ColumnData[]
}

export interface BoardState {
    boards : BoardData[]
}

interface BoardActiveStatus {
    isActive: boolean
}

const initialState: BoardState = {
    boards : []
    // boards : data.boards
}

const boardSlice = createSlice({
    name: 'kanbanBoard',
    initialState,
    reducers : {
        setBoardActive:(state, action) => {
            state.boards.map((board: BoardActiveStatus, index: number) => {
                index === action.payload.i
                  ? (board.isActive = true)
                  : (board.isActive = false)
                return board;
            })
        },
        addBoard : (state, action ) => {
            const isActive : boolean = state.boards.length > 0 ? false : true;
            const payload = action.payload
            const board : BoardData = {
                name: payload.name,
                isActive,
                columns: payload.newColumns,
            };
            state.boards.push(board)
        },
        editBoard: (state, action) => {
            const payload = action.payload
            const board = state.boards.find((board : any) => board.isActive)
            if(board) board.name = payload.name
            if(board) board.columns = payload.newColumns             
        },
        deleteBoard: (state) => {
            const board = state.boards.find((board) => board.isActive)
            if(board) { state.boards.splice(state.boards.indexOf(board), 1) }
        },
        addTask: (state, action) => {
            const { title, description,subtasks, status, assigneeName, selectedPriority, dueDate, newColIndex} =
              action.payload
            const task = { title, description, subtasks, status, assigneeName, selectedPriority, dueDate }
            const board = state.boards.find((board) => board.isActive)
            const column = board?.columns.find((col, index) => index === newColIndex)
            console.log(task)
            column?.tasks.push(task)
        },
        editTask: (state, action) => {
            const { title, description,subtasks, status, assigneeName, selectedPriority, dueDate, prevColIndex, taskIndex, newColIndex} = action.payload
            const board = state.boards.find((board) => board.isActive)
            const column = board?.columns.find((col, index) => index === prevColIndex)
            const task = column?.tasks.find((task, index) => index === taskIndex)
            if(task){
                task.title = title
                task.status = status
                task.description = description
                task.subtasks = subtasks
                task.assigneeName = assigneeName
                task.selectedPriority = selectedPriority
                task.dueDate = dueDate
            }           
            if (prevColIndex === newColIndex) return
            if(column) column.tasks = column?.tasks.filter((task, index) => index !== taskIndex)
            const newCol = board?.columns.find((col, index) => index === newColIndex)
            if(task) newCol?.tasks.push(task)
        },
        dragTask: (state, action) => {
            const { colIndex, prevColIndex, taskIndex } = action.payload
            const board = state.boards.find((board: { isActive: any }) => board.isActive)
            const prevCol = board?.columns.find((col: any, i: any) => i === prevColIndex)
            const task = prevCol?.tasks.splice(taskIndex, 1)[0]
            if(task) board?.columns.find((col, i) => i === colIndex)?.tasks.push(task)
        },
        setSubtaskCompleted: (state, action) => {
            const payload = action.payload;
            const board = state.boards.find((board) => board.isActive);
            const col = board?.columns.find((col, i) => i === payload.colIndex);
            const task = col?.tasks.find((task, i) => i === payload.taskIndex);
            const subtask = task?.subtasks.find((subtask, i) => i === payload.index);
            if(subtask) subtask.isCompleted = !subtask?.isCompleted;
        },
        setTaskStatus: (state, action) => {
            const payload = action.payload;
            const board = state.boards.find((board) => board.isActive);
            const columns = board?.columns;
            const col = columns?.find((col, i) => i === payload.colIndex);
            if (payload.colIndex === payload.newColIndex) return;
            const task = col?.tasks.find((task, i) => i === payload.taskIndex);
            if(task) task.status = payload.status;
            if(col) col.tasks = col?.tasks.filter((task, i) => i !== payload.taskIndex);
            const newCol = columns?.find((col, i) => i === payload.newColIndex);
            if(task) newCol?.tasks?.push(task);
        },
        deleteTask: (state, action) => {
            const payload = action.payload;
            const board = state.boards.find((board) => board.isActive);
            const col = board?.columns.find((col, i) => i === payload.colIndex);
            if(col) col.tasks = col?.tasks.filter((task, i) => i !== payload.taskIndex);
        },
    }
})

export const { setBoardActive, addBoard, editBoard, deleteBoard, addTask,  editTask, dragTask, setSubtaskCompleted, setTaskStatus, deleteTask} = boardSlice.actions;
export default boardSlice.reducer;