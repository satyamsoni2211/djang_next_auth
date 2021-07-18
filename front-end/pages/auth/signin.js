import { getCsrfToken } from 'next-auth/client'

export default function SignIn({ csrfToken }) {
    return (
        <div>
            <p className="w-screen text-center text-white bg-yellow-400 h-10 shadow text-3xl antialiased">
                Welcome to Next Auth Portal
            </p>
            <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2">
                <img src="http://localhost:8000/static/images/meeting.png" alt="meetings" className="h-full" />
                <div className="px-2 grid grid-cols-1 place-content-center place-items-center">
                    <p className="text-3xl antialiased text-center align-middle text-green-500">
                        One stop solution for all your applications
                    </p>
                    <form method='post' action='/api/auth/callback/credentials'
                        className="w-full bg-gray-300 rounded-lg px-2 py-4 mx-auto my-4">
                        <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                        <div className="grid grid-cols-1 gap-y-2">
                            <label className="text-white space-x-1 text-center text-sm">
                                <span className="antialiased uppercase">Username</span>
                            </label>
                            <input name='username' type='text'
                                className="rounded-xl hover:outline-none focus:outline-none px-3 text-gray-300 leading-3 h-10" />
                            <label className="text-white space-x-1 text-center text-sm">
                                <span className="antialiased uppercase">Password</span>
                            </label>
                            <input name='password' type='password'
                                className="rounded-xl hover:outline-none focus:outline-none px-3 text-gray-500 leading-3 h-10" />
                        </div>
                        <br />
                        <div className="w-full flex justify-center">
                            <button type='submit' className="w-1/3 h-10 bg-blue-500 text-white hover:bg-blue-600 rounded-xl uppercase">Sign in</button>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context)
        }
    }
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/