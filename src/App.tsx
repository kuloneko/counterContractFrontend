import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";

function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    owner_balance,
    sendIncrement,
  } = useMainContract();

  const { connected } = useTonConnect();

  return (
    <div className="App">
      <header className="App-header">
        <TonConnectButton />
      </header>
      <main className="App-main">
        {connected && (
          <button className="Increment-button" onClick={sendIncrement}>
            Increment
          </button>
        )}
        <div className="Card">
          <h2>Our Contract Address</h2>
          <p className="Hint">{contract_address?.slice(0, 30) + "..."}</p>
          <h2>Recent sender Address</h2>
          <p className="Hint">{recent_sender + "..."}</p>
          <h2>Owner Address</h2>
          <p className="Hint">{owner_address + "..."}</p>
          <h2>Our Contract Balance</h2>
          <p className="Hint">{owner_balance ?? "等等啊我找找..."}</p>
        </div>

        <div className="Card">
          <h2>Counter Value</h2>
          <p className="Hint">{counter_value ?? "不要催在找了..."}</p>
        </div>
      </main>
      
    </div>
  );
}

export default App;
