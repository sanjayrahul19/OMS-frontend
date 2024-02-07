import { decrypt } from '@/utils/decrypt';
import { encrypt } from '@/utils/encrypt';
import { useState, useEffect } from 'react';

// Custom hook for interacting with local storage
function useLocalStorage(key: string,) {
    // Get initial value from local storage or use initialValue if not present
    const [storedValue, setStoredValue] = useState(() => {
        try {
            let item;
            if (typeof window !== 'undefined') {
                item = localStorage.getItem(key);
            }
            return item ? decrypt(item) : null;
        } catch (error) {
            // If error, return null
            console.error(error);
            return null;
        }
    });

    // Update local storage whenever storedValue changes
    useEffect(() => {
        try {
            if (storedValue !== null) {
                localStorage.setItem(key, encrypt(storedValue));
            } else {
                localStorage.removeItem(key); // Remove the item if storedValue is null
            }
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}


export default useLocalStorage;
