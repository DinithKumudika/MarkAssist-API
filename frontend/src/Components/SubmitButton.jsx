function SubmitButton({children,type,classes}) {
  return (
    <button className={`w-full bg-custom-blue-2 text-white font-bold p-1 px-4 cursor-pointer ${classes} `} type={type}>{children}</button>
  )
}

export default SubmitButton
