import styles from "./Select.module.css";

export default function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name} onChange={handleOnChange} value={value || ""}>
        <option>Selecione uma Opção</option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  )
}