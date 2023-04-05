import './Message.css';

export const Message = ({author, message, timestamp}) => {

    return (
        <>
            <h1>{author}</h1>
            <p>{message}</p>
            <p>{timestamp}</p>
        </>
    );
}
