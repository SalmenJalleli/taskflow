import { createContext, useContext, useState } from 'react';

const TasksContext = createContext(null);

//useContext() = react hook that allows you to share values between components without having to explicitly pass a prop through every level of the tree.
function tasksReducer(state, action){
    switch(action.type){
        case "task/added":
            return [action.task, ...state];
        case "task/toggled":
            return state.map(task=>
                task.id === action.id ? {...task, completed: !task.completed} : task
            );
        case "task/deleted":
            return state.filter(task => task.id !== action.id)
        default:
            return state;
    }
}
export function TasksProvider({children}){
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    return(
        <TasksContext.Provider value={{tasks,dispatch}}>
            {children}
        </TasksContext.Provider>
    );
}
export function useTasks(){
    const context = useContext(TasksContext);
    if(!context){
        throw new Error("useTasks must be used inside TasksProvider");
    }
    return context;
}