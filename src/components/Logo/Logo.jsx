import logo from 'assets/logo.png';

const Logo = () => {
  return (
    <a href="https://baredit.netlify.app/">
      <img className="small medium circle left-align" src={logo} alt="BareDit Logo" />
    </a>
  );
};

export { Logo };
