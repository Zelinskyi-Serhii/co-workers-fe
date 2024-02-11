'use client';

import type { RootState } from "@/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "@/GlobalRedux/Features/counterSlice";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button className="" onClick={() => dispatch(increment())}>add 1</button>
      <button className="" onClick={() => dispatch(decrement())}>remove 1</button>
      <button className="" onClick={() => dispatch(incrementByAmount(3))}>add 3</button>
    </div>
  )
}
