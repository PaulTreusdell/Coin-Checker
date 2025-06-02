export default function Layout(props) {
  const { children } = props;
  const header = (
    <div className="header">
      <p><a href="/profile">Profile Information</a> </p>
      <p><a href="/home">Coin Checker</a></p>
      <p><a href="/check">Check Coin</a></p>
    </div>
  )

  const footer = (
    <footer className="footer">
      <p>Application created by <a target= "_blank" href="https://github.com/PaulTreusdell">Paul Treusdell</a> to practice with MERN and OpenAI API</p>
    </footer>
  )

  return (
    <div className="page">
      {header}
      <main>
        {children}
      </main>
      {footer}
    </div>
  )
}