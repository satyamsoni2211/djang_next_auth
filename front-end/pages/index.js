import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { Component, createContext, FC } from "react";

class Page extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const [session, loading] = this.context;
    return <>
      {loading && <p>Loading ...</p>}
      {!session && !loading && <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>}
      {session && !loading && <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
      </>}
    </>
  }
}

const HOC = Component => props => {
  const SessionContext = createContext();
  Component.contextType = SessionContext;
  const [session, loading] = useSession();
  return <SessionContext.Provider value={[session, loading]}>
    <Component {...props} />
  </SessionContext.Provider>
}

export default HOC(Page);