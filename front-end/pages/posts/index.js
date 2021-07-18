import { useSession, signIn, signOut } from "next-auth/client"
import { useRouter } from "next/router";

export default function Posts() {
    const [session, loading] = useSession();
    const router = useRouter();
    console.log(router.query)
    if (session) {
        console.log(session.accessToken)
    }
    return (
        <>
            {
                session ? <div>
                    This is from posts component <button onClick={() => signOut({ callbackUrl: window.location.origin })}>SignOut</button>
                </div> :
                    <p>
                        You are not authorized to view this. Please <button onClick={() => signIn("credentials", {
                            callbackUrl: window.location.href
                        })}>Sign In</button>
                    </p>
            }
        </>
    )
}