import "./index.scss";
import CurrencyConvertForm from "../../components/Form";
//MOCK
import {tokenList} from './mock';

export default function Home() {

  return (
    <div className="home">
      <h1 className="home__title">Currency Converter</h1>
      <section className="home__form">
          <CurrencyConvertForm
            tokenList={tokenList}
          />
      </section>
    </div>
  );
}
