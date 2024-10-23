const Footer = () => {
  return (
    <footer className="w-full absolute bottom-0 py-6 text-center font-serif">
      <div className="container lg:max-w-6xl px-6">
        <div className="border-t my-6" />
      </div>
      <p>Wordpress Next.js • {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
