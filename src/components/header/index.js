import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import WalletButton from "../walletButton";

export default function Headers() {
  return (
    <div>
      <div>
        <WalletButton />
      </div>
      <div>
        <RouterLink to="/transfer">Transfer</RouterLink>
      </div>
      <div>
        <RouterLink to="/allowance">Allowance</RouterLink>
      </div>
    </div>
  );
}
