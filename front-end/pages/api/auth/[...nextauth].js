import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            name: "Authentication",
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address) 
                const res = await fetch("http://web:8000/api/token/", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // let user = {
                //     name: data.user.username,
                //     email: data.user.email,
                //     refresh: data.refresh,
                //     access: data.access
                // };


                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
        // ...add more providers here

    ],
    callbacks: {
        async session(session, token) {
            // Add property to session, like an access_token from a provider.
            session.accessToken = token.accessToken
            session.refresh = token.refresh
            session.user = token.user
            console.log("session is", session);
            return session
        },
        /**
         * @param  {object}  token     Decrypted JSON Web Token
         * @param  {object}  user      User object      (only available on sign in)
         * @param  {object}  account   Provider account (only available on sign in)
         * @param  {object}  profile   Provider profile (only available on sign in)
         * @param  {boolean} isNewUser True if new user (only available on sign in)
         * @return {object}            JSON Web Token that will be saved
         */
        async jwt(token, user, account, profile, isNewUser) {
            if (process.browser) {
                const access = user.access;
                const payload = JSON.parse(window.atob(access.split(".")[1]))
                token.exp = payload.exp
            }
            // Add access_token to the token right after signin
            if (user) {
                token.accessToken = user.access
                token.refresh = user.refresh
                token.user = user.user
            }
            console.log("token is", token);
            return token
        }

    },

    pages: {
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
});