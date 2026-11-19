function getLocaldateString(date){
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function isTaskOverdue(task, today = new Date()) {
    if (!task.dueDate || task.completed) return false;
    //Read the date part from older ISO timestamps saved in localStorage
    const dueDay = task.dueDate.slice(0, 10);
    return dueDay < getLocaldateString(today);
}