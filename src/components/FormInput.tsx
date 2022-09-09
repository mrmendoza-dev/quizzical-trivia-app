import React, { useContext } from "react";


export default function FormInput(props: any) {
  return (
    <div className="trivia-input">
      <label htmlFor="amount">Number of Questions</label>
      <input type="number" id="amount" name="amount" />
    </div>
  );
}