
function ErrorMessage({ message }) {
  return (
    <div className= "mx-4 my-8 max-w-md rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-center text-red-700 sm:mx-auto">{message}</div>
  );
}

export default ErrorMessage;