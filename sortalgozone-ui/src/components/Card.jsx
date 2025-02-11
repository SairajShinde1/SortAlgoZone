import React, { useEffect, useState } from "react";
import { animate } from "motion";
import { motion } from "motion/react";

const Card = ({ darkMode }) => {
  const [algo, setAlgo] = useState("Bubble Sort");
  const [size, setSize] = useState("");
  const [speed, setSpeed] = useState(50);
  const [sortClicked, setSortClicked] = useState(false);

  const [arr, setArr] = useState([]);

  const initialize = (size) => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray[i] = Math.round(Math.random() * 100);
    }
    setArr(newArray);
    showBoxes(newArray);
  };

  useEffect(() => {
    if (arr.length > 0) {
      showBoxes(arr);
    }
  }, [arr]);

  const showBoxes = (array, move, isSorted = false) => {
    const container = document.getElementById("container");
    container.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
      const box = document.createElement("div");
      box.innerHTML = array[i];
      box.classList.add("box");

      if (container) {
        container.appendChild(box);
      } else {
        console.error("Element with id 'container' not found");
      }

      if (isSorted) {
        box.style.backgroundColor = "green";
      } else if (move && i >= move.sortedIndex) {
        box.style.backgroundColor = "green";
      } else if (move && move.indices.includes(i)) {
        box.style.backgroundColor = move.type === "swap" ? "red" : "orange";
        if (move.type === "comp") {
          // animate(box, { scale: 1.2 });
          animate(box, { scale: [1, 0.8] }, { ease: "linear", duration: 0.5 });
        } else if (move.type === "swap") {
          // animate(box, { scale: 1.2 });
          animate(
            box,
            { scale: [0.8, 1.2] },
            { ease: "linear", duration: 0.5 }
          );
        }
      } else {
        box.style.backgroundColor = "blue";
      }
    }
  };

  const sort = (arr) => {
    const array = [...arr];
    const moves = [];
    for (let i = 0; i < array.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < array.length - (i + 1); j++) {
        moves.push({
          indices: [j, j + 1],
          type: "comp",
          sortedIndex: array.length - i,
        });

        if (array[j] > array[j + 1]) {
          moves.push({
            indices: [j, j + 1],
            type: "swap",
            sortedIndex: array.length - i,
          });
          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          swapped = true;
        }
      }
      moves.push({
        indices: [],
        type: "round_complete",
        sortedIndex: array.length - (i + 1),
      });
      if (swapped === false) {
        break;
      }
    }
    // showBoxes();
    console.log(array);

    return moves;
  };

  const animation = (moves, array) => {
    if (moves.length === 0) {
      showBoxes(array, null, true);
      return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type === "swap") {
      [array[i], array[j]] = [array[j], array[i]];
    }

    showBoxes(array, move);
    setTimeout(() => {
      animation(moves, array);
    }, speed * 10);
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
            value={algo}
            className="font-medium border px-3 py-2 rounded-xl"
            name="algos"
            id=""
          >
            {/* <option className="" value="Merge Sort">
              Merge Sort
            </option>
            <option className="" value="Quick Sort">
              Quick Sort
            </option> */}
            <option className="" value="Bubble Sort">
              Bubble Sort
            </option>
            {/* <option className="" value="Selection Sort">
              Selection Sort
            </option> */}
          </select>

          <label htmlFor="size" className="font-medium">
            Array Size
          </label>
          <input
            onChange={(e) => setSize(e.target.value)}
            value={size}
            type="number"
            className="font-medium border px-3 py-2 rounded-xl"
            name="size"
          />

          <label htmlFor="speed" className="font-medium">
            Swap Speed : {speed * 10}
          </label>
          <input
            onChange={(e) => setSpeed(Number(e.target.value))}
            value={speed}
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
              onClick={() => {
                setSortClicked(true);
                const moves = sort([...arr]);
                animation(moves, arr);
                // console.log(speed);
              }}
              className="cursor-pointer border px-3 py-2 rounded-xl"
            >
              Start Sorting
            </button>
          </div>
        </div>
      </div>
      <div className="basis-2/3 flex flex-col items-center justify-center gap-5">
        <motion.div
          key={algo} // This forces re-animation when algo changes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-2xl font-medium">{sortClicked ? algo : ""}</p>
        </motion.div>
        <div id="container" className="flex items-center justify-center"></div>
        <div>
          {sortClicked ? (
            <div className="w-full">
              {" "}
              <p className="text-center">Explaination :{algo}</p>
              <div className="flex justify-center gap-3 m-5">
                <div>
                  <p>🔸 Orange → Elements being compared (current operation)</p>
                  <p>🔴 Red → Elements being swapped</p>
                  <p>🟢 Green → Sorted elements (final position)</p>
                </div>
                <div>
                  {algo === "Bubble Sort" ? (
                    <div>
                      <strong>Bubble Sort Explanation</strong>
                      <li>
                        Start from the first element <code>(i)</code> and
                        compare it with the next element <code>(i+1)</code>.
                      </li>
                      <li>
                        If <code> arr[i] {">"} arr[i+1] </code>, swap them.
                      </li>
                      <li>
                        Move to the next pair <code>(i+1 and i+2)</code> and
                        repeat the comparison and swap if needed.
                      </li>
                      <li>
                        Continue until the end of the array – the largest
                        element will "bubble up" to the last position.
                      </li>
                      <li>
                        Ignore the last sorted element and repeat the process
                        for the remaining unsorted elements.
                      </li>
                      <li>
                        Stop when no swaps are needed (this means the array is
                        sorted).
                      </li>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
