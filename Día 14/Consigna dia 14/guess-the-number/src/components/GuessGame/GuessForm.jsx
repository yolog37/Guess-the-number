import { useEffect, useRef } from 'react';

export function GuessForm({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder,
  buttonLabel,
}) {
  const inputRef = useRef(null);

  // Devuelve el foco al input cada vez que el juego vuelve a estar activo
  // (al montar, al pasar de etapa y al reiniciar).
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="guess-input"
        placeholder={placeholder}
        disabled={disabled}
      />
      <button type="submit" className="guess-button" disabled={disabled}>
        {buttonLabel}
      </button>
    </form>
  );
}
