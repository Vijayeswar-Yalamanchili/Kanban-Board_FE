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
    subtasks : SubTaskData[]
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
    // boards : []
    boards : data.boards
}

const boardSlice = createSlice({
    name: 'kanbanBoard',
    initialState,
    reducers : {
        setBoardActive:(state, action) => {
            console.log(action.payload)
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
        // addNewTask : (state, action) => {
        //     // state.boards.push(action.payload)
        //     state.boards = action.payload
        // },
        addTask: (state, action) => {
            const { title, description,subtasks, status, assigneeName, selectedPriority, dueDate, newColIndex} =
              action.payload
            const task = { title, description, subtasks, status, assigneeName, selectedPriority, dueDate }
            const board = state.boards.find((board) => board.isActive)
            const column = board?.columns.find((col, index) => index === newColIndex)
            // console.log(column)
            column?.tasks.push(task)
        },
        // editTask: (state, action) => {
        //     const { title, description,subtasks, status, assigneeName, selectedPriority, dueDate, prevColIndex, taskIndex, newColIndex} = action.payload
        //     const board = state.boards.find((board) => board.isActive)
        //     const column = board?.columns.find((col, index) => index === prevColIndex)
        //     const task = column?.tasks.find((task, index) => index === taskIndex)
        //     if(task){
        //         task.title = title
        //         task.status = status
        //         task.description = description
        //         task.subtasks = subtasks
        //         task.assigneeName = assigneeName
        //         task.selectedPriority = selectedPriority
        //         task.dueDate = dueDate
        //     }           
        //     if (prevColIndex === newColIndex) return
        //     if(column) column.tasks = column?.tasks.filter((task, index) => index !== taskIndex)
        //     const newCol = board?.columns.find((col, index) => index === newColIndex)
        //     newCol?.tasks.push(task)
        // },
        // dragTask: (state, action) => {
        //   const { colIndex, prevColIndex, taskIndex } = action.payload;
        //   const board = state.find((board) => board.isActive);
        //   const prevCol = board.columns.find((col, i) => i === prevColIndex);
        //   const task = prevCol.tasks.splice(taskIndex, 1)[0];
        //   board.columns.find((col, i) => i === colIndex).tasks.push(task);
        // },
        // setSubtaskCompleted: (state, action) => {
        //   const payload = action.payload;
        //   const board = state.find((board) => board.isActive);
        //   const col = board.columns.find((col, i) => i === payload.colIndex);
        //   const task = col.tasks.find((task, i) => i === payload.taskIndex);
        //   const subtask = task.subtasks.find((subtask, i) => i === payload.index);
        //   subtask.isCompleted = !subtask.isCompleted;
        // },
        // setTaskStatus: (state, action) => {
        //   const payload = action.payload;
        //   const board = state.find((board) => board.isActive);
        //   const columns = board.columns;
        //   const col = columns.find((col, i) => i === payload.colIndex);
        //   if (payload.colIndex === payload.newColIndex) return;
        //   const task = col.tasks.find((task, i) => i === payload.taskIndex);
        //   task.status = payload.status;
        //   col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
        //   const newCol = columns.find((col, i) => i === payload.newColIndex);
        //   newCol.tasks.push(task);
        // },
        // deleteTask: (state, action) => {
        //   const payload = action.payload;
        //   const board = state.find((board) => board.isActive);
        //   const col = board.columns.find((col, i) => i === payload.colIndex);
        //   col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
        // },
    }
})

export const { setBoardActive, addBoard, editBoard, deleteBoard, addTask, } = boardSlice.actions;
export default boardSlice.reducer;