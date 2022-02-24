import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import BEP20_ABI from "../web3/BEP20_ABI.json";
import BigNumber from "bignumber.js";

export default function Transfer() {
  const [amount, setAmount] = useState(null);
  const [allowance, setAllowance] = useState(null);
  const address = useSelector((state) => state.address.address);
  const BASE = Math.pow(10, 18);
  const mainnetWeb3Reader = new Web3(window.ethereum);
  const contract = new mainnetWeb3Reader.eth.Contract(
    BEP20_ABI,
    "0x4ABEf176F22B9a71B45ddc6c4A115095d8761b37"
  );

  useEffect(async () => {
    const allowance = await contract.methods
      .allowance(
        "0xd9Ecd48CFD89974C6EB997CBBa4d491A6c3A09D4",
        "0x4ABEf176F22B9a71B45ddc6c4A115095d8761b37"
      )
      .call();
    setAllowance(allowance);
  }, []);

  function handleTransferChange(e) {
    setAmount(BigNumber(e.target.value).times(BASE).toFixed());
  }

  async function transfer() {
    await contract.methods
      .transfer("0xab694AAd009F9671E019427b4F9DFC52EB9E9c92", amount)
      .send({ from: address });
  }

  async function approve() {
    await contract.methods
      .approve("0x4ABEf176F22B9a71B45ddc6c4A115095d8761b37", amount)
      .send({ from: address });
  }

  async function handleApprove() {
    await approve();
  }

  async function transferAmount() {
    if (amount > allowance) {
      await handleApprove();
    }
    await transfer();
  }
  return (
    <div>
      <TextField onChange={handleTransferChange}></TextField>
      <Button onClick={transferAmount}>Transfer</Button>
    </div>
  );
}
