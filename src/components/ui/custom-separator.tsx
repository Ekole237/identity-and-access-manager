type Props = {
  label: string
}

const CustomSeparator = ({ label }: Props) => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="h-px bg-gray-300 flex-grow" />
      <span className="mx-2 text-gray-500">{label}</span>
      <div className="h-px bg-gray-300 flex-grow" />
    </div>
  )
}

export default CustomSeparator