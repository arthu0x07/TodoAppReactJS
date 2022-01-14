import "../styles/header.scss";
import img from "../../public/logo.svg";

export function Header() {
  return (
    <header className="header">
      <div>
        <img src={img} alt="to.do" />
      </div>
    </header>
  );
}
