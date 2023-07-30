import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <section className="sign-in-up__form">
      <h1 className ="sign-in-up__header" >404 Page Not Found</h1>
      <button className="sign-in-up__button-submit" onClick={goBack}>Вернуться</button>
    </section>
  );
}

export default PageNotFound;