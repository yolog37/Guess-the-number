import { useEffect, useState } from 'react';

// Como useState, pero persiste el valor en localStorage (con manejo de errores).
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Almacenamiento no disponible (modo privado, cuota llena...): se ignora.
    }
  }, [key, value]);

  return [value, setValue];
}
