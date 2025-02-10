import React, { useEffect, useState } from "react";

const Card = ({ darkMode }) => {
  const [algo, setAlgo] = useState("");
  const [size, setSize] = useState("");
  const [speed, setSpeed] = useState("");

  const array = [];

  const initialize = (size) => {
    for (let i = 0; i < size; i++) {
      array[i] = Math.round(Math.random() * 100);
    }
    console.log(array);
    showBoxes();
  };

  useEffect(() => {
    const container = document.querySelector("#container");
  }, []);
  const showBoxes = () => {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      const box = document.createElement("div");
      box.innerHTML = array[i];
      box.classList.add("box");

      if (container) {
        container.appendChild(box);
      } else {
        console.error("Element with id 'container' not found");
      }
    }
  };

  const sort = (array) => {
    let swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - (i + 1); j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          swapped = true;
        }
      }
      if (swapped === false) {
        break;
      }
    }
    showBoxes();
    console.log(array);
  };

  return (
    <div className="flex items-center ">
      <div
        className={`basis-1/3 m-5 p-5 ${
          darkMode
            ? "border-2 border-white rounded-xl"
            : "border-2 border-black rounded-xl"
        }`}
      >
        <div className={`flex flex-col text-center gap-5`}>
          <label htmlFor="algos" className="font-medium">
            Choose a Algorithm
          </label>
          <select
            onChange={(e) => setAlgo(e.target.value)}
            className="font-medium border px-3 py-2 rounded-xl"
            name="algos"
            id=""
          >
            <option className="" value="merge">
              Merge Sort
            </option>
            <option className="" value="quick">
              Quick Sort
            </option>
            <option className="" value="bubble">
              Bubble Sort
            </option>
            <option className="" value="selection">
              Selection Sort
            </option>
          </select>

          <label htmlFor="size" className="font-medium">
            Array Size
          </label>
          <input
            onChange={(e) => setSize(e.target.value)}
            type="number"
            className="font-medium border px-3 py-2 rounded-xl"
            name="size"
          />

          <label htmlFor="speed" className="font-medium">
            Sorting Speed
          </label>
          <input
            onChange={(e) => setSpeed(e.target.value)}
            type="range"
            className="font-medium border px-3 py-2 rounded-xl"
            min="0"
            max="100"
            name="speed"
          />

          <div className="flex justify-between">
            <button
              onClick={() => initialize(size)}
              className="cursor-pointer border px-3 py-2 rounded-xl"
            >
              Generate Array
            </button>
            <button
              onClick={() => sort(array)}
              className="cursor-pointer border px-3 py-2 rounded-xl"
            >
              Start Sorting
            </button>
          </div>
        </div>
      </div>
      <div
        id="container"
        className="basis-2/3 flex items-center justify-center"
      ></div>
    </div>
  );
};

export default Card;
