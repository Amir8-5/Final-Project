import {useState} from 'react' 

export default function Form () {
    const [text, setText] = useState('');
    
    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(text);
        setText('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={text} onChange={handleChange} type="text" />
            <button >Submit</button>
        </form>
    );
}