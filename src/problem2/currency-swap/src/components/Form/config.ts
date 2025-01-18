import { DefaultOptionType } from "antd/es/select";
import { FlattenOptionData } from "rc-select/lib/interface";
import { LabelInValueType } from "rc-select/lib/Select";

export const filterOption = (input: string, option?: DefaultOptionType) =>
  (option?.title ?? "").toLowerCase().includes(input.toLowerCase());

export const validateMessages = {
  required: "${label} is required",
  pattern: {
    mismatch: "${label} is not a valid number",
  },
};

const selectClassName = "currency-convert";
export const selectConfig = {
  showSearch: true,
  placeholder: "Type to search",
  labelInValue: true,
  popupClassName: selectClassName,
  className: selectClassName,
  optionRender: (option: FlattenOptionData<DefaultOptionType>) =>
    option.label,
  labelRender: (prop: LabelInValueType) => prop.label,
  filterOption,
};
export const decimal = 6;
export const currentTime = new Date().toUTCString();