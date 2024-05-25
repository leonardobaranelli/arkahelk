import React from 'react';
import { Counter } from "../Redux-Toolkit/features/counter/Counter";
import { Quotes } from "../Redux-Toolkit/features/quotes/Quotes";
    
export default function ReduxToolkitDefault() {

  return (
    <div>
        <Counter />
        <Quotes />
    </div>    
  )
}