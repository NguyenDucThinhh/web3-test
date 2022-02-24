import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import Web3 from "web3";
import BEP20_ABI from "../web3/BEP20_ABI.json";
import BigNumber from "bignumber.js"
import { useSelector } from "react-redux";

export default function Allowance() {
  const [allowance, setAllowance] = useState(null);
  const [amount, setAmount] = useState(null)
  const web3Reader = new Web3(window.ethereum);
  const BASE = Math.pow(10, 18);
  const address = useSelector(state => state.address.address)

  const contract = new web3Reader.eth.Contract(
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

  async function approve(){
    await contract.methods.approve("0x4ABEf176F22B9a71B45ddc6c4A115095d8761b37", amount).send({from : address })
  }

  function handleApproveChange(ev){
    setAmount(BigNumber(ev.target.value).times(BASE).toFixed())
  }

  return (
    <div>
      <div>{allowance}</div>
      <TextField onChange={handleApproveChange} />
      <Button onClick={approve}>Approve</Button>
    </div>
  );
}
