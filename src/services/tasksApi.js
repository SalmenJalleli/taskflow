const API_BASE = "https://example.com/api"

export async function fetchTasks(signal){
    const response = await fetch("/tasks.json",{signal});
    if(!response.ok){
        throw new Error(`Request failed: ${response.status}`)
    }
    return response.json();
}