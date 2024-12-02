import logo from 'assets/logo.png';

const Logo = () => {
  return (
    <a className="shrink-0" href="https://baredit.netlify.app/">
      <img className="size-9 rounded-full" src={logo} alt="BareDit Logo" />
    </a>
  );
};

export { Logo };
