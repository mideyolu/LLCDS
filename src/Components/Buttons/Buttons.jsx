const Buttons = ({text, onClick, className}) => {
  return (
    <div className={`px-[0.2em] buttons mt-[1rem] border cursor-pointer py-3 w-[30%]  ease-in-out transition-all duration-150 ${className}`} onClick={onClick}>
        {text}
    </div>
  )
}

export default Buttons
