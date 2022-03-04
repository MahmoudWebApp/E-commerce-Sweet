const Input = ({ name, type, label,onChange,value, part, ...props }) => {
  return (
    <div className={`${part}__item`}>
      <input
        key={label}
        type={type}
        className={`${part}__input`}
        placeholder=" "
        autoComplete="off"
        value={value}
        name={name}
        onChange={onChange}
        required
        {...props}
      />
      <label htmlFor={name} className={`${part}__label`}>
        {label}
      </label>
    </div>
  );
};

export default Input;
