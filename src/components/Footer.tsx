const Footer = () => {
  return (
    <footer className="my-6 text-center">
      <div className="container lg:max-w-6xl px-6">
        <div className="border-t my-6" />
      </div>
      <p>Wordpress Next.js • {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
