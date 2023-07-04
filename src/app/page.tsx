"use client";

import React from 'react'
import { decrement, increment, reset } from "./Redux/Reducer/counterSclice";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { useRouter } from 'next/navigation';

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if(typeof localStorage !== 'undefined' && !localStorage?.getItem('USER')) {
    router.push('/login')
  }

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>
    </main>
  );
}
