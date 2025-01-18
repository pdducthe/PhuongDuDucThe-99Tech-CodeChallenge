//STYLES
import "./index.scss";
//ASSETS
import ConvertArrow from "../../assets/arrows.png";
//PACKAGE
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Form, Space } from "antd";
//CMP
import BaseButton from "../Button";
import BaseInput from "../Input";
import BaseSelect from "../Select";
//TYPE
import {
  CurrencyConvertFormProps,
  IConvertFormValues,
} from "../../pages/home/type";
//UTILS
import { delayAction } from "../../utils/common";
//CONFIG
import { currentTime, decimal, selectConfig, validateMessages } from "./config";

export default function CurrencyConvertForm({
  tokenList,
}: CurrencyConvertFormProps) {
  const baseCurrencyIdx = 9;
  const quoteCurrencyIdx = 3;
  let exchangeResClassName = "exchange-res";

  const resultRef = useRef<HTMLDivElement>(null);
  const [baseCurrency, setBaseCurrency] = useState<string>(
    tokenList[baseCurrencyIdx].currency
  );
  const [quoteCurrency, setQuoteCurrency] = useState<string>(
    tokenList[quoteCurrencyIdx].currency
  );
  const [submitBtn, setSubmitBtn] = useState<{
    isDisabled: boolean;
    isLoading: boolean;
  }>({ isDisabled: true, isLoading: false });
  const [rate, setRate] = useState<number>(
    tokenList[baseCurrencyIdx].price / tokenList[quoteCurrencyIdx].price
  );
  const [amount, setAmount] = useState<{ value: number; isLoading: boolean }>({
    value: 1,
    isLoading: false,
  });
  const [exchangeRes, setExchangeRes] = useState<{
    value: string;
    visible: boolean;
  }>({ value: (rate * amount.value).toFixed(decimal), visible: true });
  const [initialConvert, setInitialConvert] = useState<boolean>(false);
  const deferredCurrency = useDeferredValue<{
    baseCurrency: string;
    quoteCurrency: string;
  }>({ baseCurrency, quoteCurrency });

  const isStaleCurrencyPair =
    baseCurrency === deferredCurrency.baseCurrency &&
    quoteCurrency === deferredCurrency.quoteCurrency;

  //setting
  const currencyOptions = useMemo(() => {
    return tokenList.map((token) => {
      return {
        key: token.id, //do not use id
        value: token.price,
        title: token.currency,
        label: (
          <Space size={"middle"} align="center">
            <span className="icon" role="img">
              <img alt={token.currency || "Token"} src={token.img} />
            </span>
            <span className="title">{token.currency}</span>
          </Space>
        ),
        // emoji: <img alt={token.currency || "Token"} src={token.img} />,
      };
    });
  }, [tokenList]);
  const [form] = Form.useForm();
  const fieldValues = Form.useWatch([], form);

  useEffect(() => {
    setInitialConvert(false);
  }, []);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() =>
        setSubmitBtn((prevState) => ({ ...prevState, isDisabled: false }))
      )
      .catch(() =>
        setSubmitBtn((prevState) => ({ ...prevState, isDisabled: true }))
      );
  }, [fieldValues]);
  useEffect(() => {
    if (isStaleCurrencyPair && initialConvert) {
      setSubmitBtn((prevState) => ({ ...prevState, isLoading: true }));
      setExchangeRes((prevState) => ({ ...prevState, visible: false }));
      delayAction(1500, () => {
        setSubmitBtn((prevState) => ({ ...prevState, isLoading: false }));
        handleConvertAmount();
      });
    }
  }, [amount.value, isStaleCurrencyPair]);
  useEffect(() => {
    handleDisplayResult();
  }, [exchangeRes.visible]);

  const convertRate = useCallback(
    (left_currency: string, right_currency: string) => {
      const leftToken =
        currencyOptions.find((currency) => currency.title === left_currency)
          ?.value ?? 1;
      const rightToken =
        currencyOptions.find((currency) => currency.title === right_currency)
          ?.value ?? 1;
      const rate = leftToken / rightToken;
      setRate(rate);
      return rate;
    },
    []
  );
  //antd method
  const onValuesChange = (_changes: any, values: IConvertFormValues) => {
    const baseCurrency = values?.left_currency.title;
    const quoteCurrency = values?.right_currency.title;

    convertRate(baseCurrency, quoteCurrency);
    setBaseCurrency(baseCurrency);
    setQuoteCurrency(quoteCurrency);
    setAmount((prevState) => ({
      ...prevState,
      value: Number(values?.amount) ?? 1,
    }));
  };
  const handleConvertAmount = () =>
    setExchangeRes({
      value: (rate * amount.value).toFixed(decimal),
      visible: true,
    });
  const handleDisplayResult = () =>
    resultRef.current && resultRef.current.classList.toggle("hidden");
  const onFinish = () => {
    setSubmitBtn((prevState) => ({ ...prevState, isLoading: true }));
    setInitialConvert(true);
    delayAction(500, () => {
      setSubmitBtn((prevState) => ({ ...prevState, isLoading: false }));
      handleConvertAmount();
    });
  };

  return (
    <>
      <Form
        className="currency-convert"
        name="currency-convert"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        validateMessages={validateMessages}
        onValuesChange={onValuesChange}
      >
        <div className="input-wrapper">
          <Form.Item
            name="amount"
            label="Amount"
            required
            rules={[{ required: true }, { pattern: new RegExp(/^[0-9]+$/) }]}
            initialValue={amount.value}
          >
            <BaseInput prefix={baseCurrency} />
          </Form.Item>
          <div className="currency">
            <Form.Item
              name="left_currency"
              label="From"
              initialValue={currencyOptions[baseCurrencyIdx]}
            >
              <BaseSelect {...selectConfig} options={currencyOptions} />
            </Form.Item>
            <div className="conversion-icon">
              <img alt="convert" src={ConvertArrow} />
            </div>
            <Form.Item
              name="right_currency"
              label="To"
              initialValue={currencyOptions[quoteCurrencyIdx]}
            >
              <BaseSelect {...selectConfig} options={currencyOptions} />
            </Form.Item>
          </div>
        </div>

        <div className="convert" ref={resultRef}>
          <div className={exchangeResClassName}>
            <p className="left">
              {amount.value} <span>{baseCurrency}&nbsp;=&nbsp;</span>
            </p>
            <p className="right">
              {exchangeRes.value} <span>{quoteCurrency}</span>
            </p>
            <p className="desc">
              1 {baseCurrency}&nbsp;=&nbsp;{rate.toFixed(decimal)}{" "}
              {quoteCurrency}
            </p>
          </div>
          <div className="button-wrapper">
            <p>
              <a href="#">{baseCurrency}</a> to <a href="#">{quoteCurrency}</a>{" "}
              conversion - Last updated {currentTime}
            </p>
            <Form.Item label={null}>
              <BaseButton
                type="primary"
                htmlType="submit"
                disabled={submitBtn.isDisabled}
                loading={submitBtn.isLoading}
              >
                Convert
              </BaseButton>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
}
