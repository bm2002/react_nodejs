export const renderInput = (props) => (
    <input {...props.input}
        className="form-control"
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        type={props.type}
    />
)