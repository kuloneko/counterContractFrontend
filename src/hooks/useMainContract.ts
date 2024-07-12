import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, Contract, OpenedContract } from "ton-core";
import { toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";


export function useMainContract() {
  const client = useTonClient();
  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
    owner_balance: number;
  }>();
  
  const { sender } = useTonConnect();
    
    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));


  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new MainContract(
      Address.parse("EQDdUTwLg4Ow9IbRlnKRKPDnJfM8JIkZOXV4stcIUzHmIklV") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract as Contract) as OpenedContract<MainContract>;
  }, [client]) as any;

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const val = await mainContract.getData();
      const balance = await mainContract.getBalance();
      setContractData({
        counter_value: val.number,
        recent_sender: val.recent_sender,
        owner_address: val.owner_address,
        owner_balance: balance.number,
      });
      await sleep(10000); // sleep 5 seconds and poll value again
      getValue();
    }
    getValue();
  }, [mainContract]);

  return {
    
    contract_address: mainContract?.address.toString(),
    ...contractData,

    sendIncrement: () => {
      return mainContract?.sendIncrement(sender, toNano(0.05), 3);
    },
  };
}

