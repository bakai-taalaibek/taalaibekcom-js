import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className={ errorMessageElement }>
      <h1 className='text-4xl'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='text-gray-500'>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

const errorMessageElement = `
  min-h-screen grid content-center justify-items-center
  [&>*]:m-2 pb-10
  font-serif text-xl `