export default function WhiteBorderButton ({
    showSomething,
    name
} : {
    showSomething: (open: boolean) => void
    name: string
}) {
    return(
        <button
        type="button"
        className=" text-white border-white border-4 text-2xl font-extrabold py-4 px-10 rounded-full shadow-2xl transform hover:scale-110 hover:rotate-6 hover:shadow-2xl hover:ring-4 hover:ring-blue-300 transition-all duration-500 ease-in-out"
        onClick={() => showSomething(true)}
        >
            {name}
        </button>
    )
}