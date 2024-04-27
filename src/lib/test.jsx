export const FillFormWithDataset = ({ onclick, top, right, type }) => {
    return (
        <button
            type={type || 'button'}
            className="fill-form-dataset"
            onClick={onclick}
            style={{
                position: 'fixed',
                top: top || '100px',
                right: right || '100px',
                padding: '10px',
                border: '2px black solid',
            }}
        >
            Fill
        </button>
    )
}
