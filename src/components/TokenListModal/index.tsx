import c from "classnames";
import { ModalFuncProps, Input } from "antd";
import BaseModal from "../BaseModal";

import TokenList from "@/constants/tokenlist";

import styles from "./index.less";

interface TokenListModalProps extends ModalFuncProps {
  onSelected: (tokenName: string | number) => void;
}

export default function TokenListModal(props: TokenListModalProps) {
  const { onSelected, ...rest } = props;
  return (
    <BaseModal title="Select a token" footer={false} {...rest}>
      <div className={c([styles["token-list-modal"]])}>
        <Input placeholder="Search token by name or address" allowClear />
        <div className={c("flex-row", styles["notice"])}>
          <i></i>
          <p>
            Below is the supported token list from Ethereum Mainnet to BNB
            Chain. More tokens can be found if you select other chains.
          </p>
        </div>
        <ul className={c(styles["token-list"])}>
          {TokenList.map(({ symbol, desc }) => (
            <li key={symbol + desc} onClick={() => onSelected(symbol)}>
              <TokenListItem symbol={symbol} desc={desc} />
            </li>
          ))}
        </ul>
      </div>
    </BaseModal>
  );
}

interface TokenListItemProps {
  symbol: string;
  desc: string;
}
function TokenListItem({ symbol, desc }: TokenListItemProps) {
  return (
    <div className={c(["flex-row", styles["token-list-item"]])}>
      <div className={c(styles["token-info"])}>
        <i></i>
        <span>{symbol}</span>
      </div>
      <div className={c(styles["price-info"])}>
        <span>{desc}</span>
      </div>
    </div>
  );
}
