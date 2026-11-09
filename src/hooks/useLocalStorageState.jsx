import { useState, useEffect } from "react";
//An effect synchronizes a component with an external system. In this case, we want to synchronize the document title with the number of tasks in our app. We can use the useEffect hook to achieve this.
//localStorage is a browser API that allows us to store data in the browser's local storage. We can use it to persist the tasks state across page reloads.
// The useLocalStorageState custom hook abstracts the logic for reading and writing to localStorage,
// making it reusable across different components.
function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
export default useLocalStorageState;
