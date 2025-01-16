//@ts-ignore
import { useCallback, useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; //refactored
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
  id: string; //refactored
}

//@ts-ignore
interface Props extends BoxProps {}

//refactored
enum EBlockChain {
  OSMOSIS = "OSMOSIS",
  ETHEREUM = "ETHEREUM",
  ARBITRUM = "ARBITRUM",
  ZILLIQA = "ZILLIQA",
  NEO = "NEO",
}

//@ts-ignore
const WalletPage: React.FC<Props> = (props: Props) => {
  //@ts-ignore
  const { children, ...rest } = props;
  //@ts-ignore
  const balances = useWalletBalances();
  //@ts-ignore
  const prices = usePrices();

  const getPriority = useCallback((blockchain: string) => {
    //refactored type of parameter
    switch (blockchain) {
      //refactored
      case EBlockChain.OSMOSIS: //refactored case name
        return 100;
      case EBlockChain.ETHEREUM:
        return 50;
      case EBlockChain.ARBITRUM:
        return 30;
      case EBlockChain.ZILLIQA:
        return 20;
      case EBlockChain.NEO:
        return 20;
      default:
        return -99;
    }
  }, []);

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const lhsPriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else {
          return 1;
        }
      });
  }, [balances, prices]);

  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      //@ts-ignore
      <WalletRow
        //@ts-ignore
        className={classes.row}
        key={balance.id} //refactored
        // key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

/* 
1. Cases Name in switch of function get Priority could be replaced with enum for consistency

2. The type of blockchain in the function getPriority could be changed into string rather any, as all values used in this function are all of type string.

2.balance.blockchain has error due to blockchain property does not exist in type WalletBallance => new property "blockchain" will be added to interface WalletBalance

3.Variable lhsPriority wasn't declared while Variable balance hasn't been used. Function getPriority returns number, should be used in this case. So, balancePriority was changed into lhsPriority.

4. getPriority could be applied with useCallback to cache function because it is called in different places

5. sort in functin sortedBalances: case (rightPriority > leftPriority) seems to be redundant, or presumably, not covering the "equal" case where leftPriority and rightPriority are the same => changed into else{} might be a better option 

6. Variable formattedBalances is declared but never used => opt to be removed

7. In rows variable, as rendering map in component WalletRow, there are some points:
+property "key" has value as index of the array which could cause issue of re-rendering => should use something like id, assuming parameter balance has id property

*/
