import {useState} from 'react' 

export default function Form ({onSubmit}) {
    const [text, setText] = useState('');
    
    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(text);
        setText('');
        onSubmit(text);
    }

    return (
        <form className='flex justify-center content-center p-3 gap-4' onSubmit={handleSubmit}>
            <input className='h-8 w-18 bg-lavender border-gray-400 border text-green-950 lato-regular text-center rounded focus:outline-none focus:border-gray-600 focus:shadow-lg' autoComplete='off' value={text} onChange={handleChange} type="text" />
            <button className='w-16 lato-regular bg-asparagus rounded-md text-lavender cursor-pointer active:bg-green-700 duration-300 shadow-lg p-1'>Submit</button>
        </form>
    );
}