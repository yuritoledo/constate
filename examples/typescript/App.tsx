// It just works! No need to type anything explicitly.
import * as React from "react";
import constate from "constate";

function useCounter<T>({ initialCount = 0 } = {}) {
  const [count, setCount] = React.useState(initialCount);
  const [x, setX] = React.useState<T[]>([]);
  const increment = React.useCallback(() => setCount(c => c + 1), []);
  return { count, increment, x, setX };
}

const [CounterProvider, useCount, useIncrement] = constate(
  useCounter,
  value => value.count,
  value => value.increment
);

function IncrementButton() {
  const increment = useIncrement();
  return <button onClick={increment}>+</button>;
}

function Count() {
  const count = useCount();
  return <span>{count}</span>;
}

function App() {
  return (
    <CounterProvider initialCount={10}>
      <Count />
      <IncrementButton />
    </CounterProvider>
  );
}

export default App;
