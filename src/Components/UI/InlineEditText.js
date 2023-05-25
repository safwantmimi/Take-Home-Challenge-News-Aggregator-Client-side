import React from 'react';
import { MDBIcon} from 'mdb-react-ui-kit';

const InlineEdit = ({ value, setValue }) => {
    const [editingValue, setEditingValue] = React.useState(value);
  
    const makeInputEditable = () => {
        let input = document.getElementById('username-id')
        input.focus();
        input.removeAttribute('readOnly')
    }
    const onChange = (event) => {
        setEditingValue(event.target.value)
    };
  
    const onKeyDown = (event) => {
      if (event.key === "Enter" || event.key === "Escape") {
        event.target.blur();
      }
    };
  
    const onBlur = (event) => {
        let value = document.getElementById('username-id').attributes['value'].value
      if (value.trim() === "") {
        setEditingValue(value);
      } else {
        setValue(value);
      }
    };
  
    return (
        <div className="d-flex mx-2">
            <input
              id='username-id'
              type="text"
              aria-label="Field name"
              className="inline-edit-field"
              value={editingValue}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
            />
            <MDBIcon fas icon="pencil-alt" className='mx-2 cursor-pointer' onClick={makeInputEditable} />
        </div>
    );
  };
  
export default InlineEdit;
  