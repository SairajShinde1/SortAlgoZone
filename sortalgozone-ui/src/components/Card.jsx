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
    for (let i = 0; i < array.length; i++) {
      const box = document.createElement("div");
      box.innerHTML = array[i];
      box.classList.add("box");

      if (container) {
        container.appendChild(box);
      } else {
        console.error("Element with id 'container' not found");
      }

      if (algo === "Bubble Sort") {
        if (isSorted) {
          box.style.backgroundColor = "green";
        } else if (move && i >= move.sortedIndex) {
          box.style.backgroundColor = "green";
        } else if (move && move.indices.includes(i)) {
          box.style.backgroundColor = move.type === "swap" ? "red" : "orange";
          if (move.type === "comp") {
            // animate(box, { scale: 1.2 });
            animate(
              box,
              { scale: [1, 0.8] },
              { ease: "linear", duration: 0.5 }
            );
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
      } else if (algo === "Selection Sort") {
        if (isSorted) {
          box.style.backgroundColor = "green";
        } else if (move && i === move.sortedIndex) {
          // ✅ Fixed: Only mark the exact index as sorted
          box.style.backgroundColor = "blue";
          if (move.type === "swap") {
            box.style.backgroundColor = "red";
            animate(
              box,
              { scale: [0.8, 1.2] },
              { ease: "linear", duration: 0.5 }
            );
          }
        } else if (move && i <= move.sortedIndex) {
          // ✅ Fixed: Only mark the exact index as sorted
          box.style.backgroundColor = "green";
        } else if (move && move.indices.includes(i)) {
          box.style.backgroundColor = move.type === "swap" ? "red" : "orange";
          if (move.type === "comp") {
            animate(
              box,
              { scale: [1, 0.8] },
              { ease: "linear", duration: 0.5 }
            );
          } else if (move.type === "swap") {
            animate(
              box,
              { scale: [0.8, 1.2] },
              { ease: "linear", duration: 0.5 }
            );
          }
        } else {
          box.style.backgroundColor = "blue";
        }
      } else if (algo === "Insertion Sort") {
        if (isSorted) {
          box.style.backgroundColor = "green"; // ✅ Final sorted color
        } else if (move && move.indices.includes(i)) {
          if (move.type === "comp") {
            box.style.backgroundColor = "orange"; // 🔶 Comparison color
            animate(
              box,
              { scale: [1, 0.8] },
              { ease: "linear", duration: 0.5 }
            );
          } else if (move.type === "shift") {
            box.style.backgroundColor = "red"; // 🔴 Shift color
            animate(
              box,
              { scale: [0.8, 1.2] },
              { ease: "linear", duration: 0.5 }
            );
          } else if (move.type === "insert") {
            box.style.backgroundColor = "purple"; // 🟡 Inserted value color
            animate(
              box,
              { scale: [1, 1.3, 1] },
              { ease: "linear", duration: 0.5 }
            );
          }
        } else if (move && i <= move.sortedIndex) {
          box.style.backgroundColor = "green"; // ✅ Sorted portion color
        } else {
          box.style.backgroundColor = "blue"; // 🔵 Default color
        }
      }
    }
  };

  const disableControls = () => {
    document.querySelectorAll("button, select, input").forEach((el) => {
      el.disabled = true;
    });
    document.getElementById("card").style.opacity = "0.2";
  };

  const enableControls = () => {
    document.querySelectorAll("button, select, input").forEach((el) => {
      el.disabled = false;
    });
    document.getElementById("card").style.opacity = "1";
  };

  let isSorting = false;

  const sort = (arr) => {
    const array = [...arr];
    const moves = [];
    if (isSorting) return;

    isSorting = true;
    disableControls();

    if (algo === "Bubble Sort") {
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
    } else if (algo === "Selection Sort") {
      for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
          // Mark comparison
          moves.push({
            indices: [j, minIndex],
            type: "comp",
            sortedIndex: i, // Marks elements being compared
          });

          if (array[j] < array[minIndex]) {
            minIndex = j;
          }
        }

        // Only swap if a new minimum is found
        if (minIndex !== i) {
          [array[minIndex], array[i]] = [array[i], array[minIndex]];

          // Mark swap move AFTER swap actually happens
          moves.push({
            indices: [i, minIndex],
            type: "swap",
            sortedIndex: i, // Element at 'i' is sorted after swap
          });
        }

        // Mark round completion
        moves.push({
          indices: [],
          type: "round_complete",
          sortedIndex: i, // 'i' is now sorted
        });
      }
      console.log(array);
    } else if (algo === "Insertion Sort") {
      for (let i = 1; i < array.length; i++) {
        let temp = array[i];
        let j = i - 1;
        for (; j >= 0; j--) {
          moves.push({
            indices: [j, i],
            type: "comp",
            sortedIndex: i - 1,
          });
          if (array[j] > temp) {
            array[j + 1] = array[j];
            moves.push({
              indices: [j + 1, j],
              type: "shift",
              sortedIndex: i - 1,
            });
          } else {
            break;
          }
        }

        array[j + 1] = temp;
        moves.push({
          indices: [j + 1],
          type: "insert",
          sortedIndex: i - 1,
          value: temp,
        });
      }
    }
    // showBoxes();
    console.log(array);
    return moves;
  };

  const animation = (moves, array) => {
    if (moves.length === 0) {
      showBoxes(array, null, true);
      // setSortClicked(false);
      isSorting = false;
      enableControls();

      return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type === "swap") {
      [array[i], array[j]] = [array[j], array[i]];
    } else if (move.type === "shift") {
      array[i] = array[j];
    } else if (move.type === "insert") {
      const temp = move.value; // Retrieve stored temp value
      array[i] = temp; // Insert it at the correct position
    }

    showBoxes(array, move);
    setTimeout(() => {
      animation(moves, array);
    }, speed * 10);
  };

  return (
    <div className="flex items-center ">
      <div
        id="card"
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
            <option
              className={
                darkMode ? "bg-[#1c1c1c] text-white" : "bg-white text-black"
              }
              value="Bubble Sort"
            >
              Bubble Sort
            </option>
            <option
              className={
                darkMode ? "bg-[#1c1c1c] text-white" : "bg-white text-black"
              }
              value="Selection Sort"
            >
              Selection Sort
            </option>
            <option
              className={
                darkMode ? "bg-[#1c1c1c] text-white" : "bg-white text-black"
              }
              value="Insertion Sort"
            >
              Insertion Sort
            </option>
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
              {algo === "Bubble Sort" ? (
                <div className="flex justify-center gap-3 m-5">
                  <div>
                    <p>
                      🔸 Orange → Elements being compared (current operation)
                    </p>
                    <p>🔴 Red → Elements being swapped</p>
                    <p>🟢 Green → Sorted elements (final position)</p>
                  </div>
                  <div>
                    <div>
                      <strong className="text-xl text-gray-500">
                        Bubble Sort Explanation
                      </strong>
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
                  </div>
                </div>
              ) : algo === "Selection Sort" ? (
                <div className="flex justify-center gap-5 m-5">
                  <div>
                    <p>🔵 Blue → Unsorted elements (yet to be processed)</p>
                    <p>
                      🟠 Orange → Elements being compared (current operation)
                    </p>
                    <p> 🔴 Red → Elements being swapped</p>
                    <p>🟢 Green → Sorted elements (final position)</p>
                  </div>
                  <div>
                    <div>
                      <strong className="text-xl text-gray-500">
                        Selection Sort Explanation
                      </strong>
                      <li>
                        <b>Find the Minimum:</b> In each iteration, find the
                        smallest element in the unsorted part of the array.
                      </li>
                      <li>
                        <b>Swap:</b> Swap this minimum element with the first
                        element of the unsorted part.
                      </li>
                      <li>
                        <b>Move to the Next Element:</b> The sorted part of the
                        array grows by one element, and the unsorted part
                        shrinks.
                      </li>
                      <li>
                        <b>Repeat Until Sorted.</b>
                      </li>
                    </div>
                  </div>
                </div>
              ) : algo === "Insertion Sort" ? (
                <div className="flex justify-center gap-5 m-5">
                  <div>
                    <p>🔵 Blue → Unsorted Part</p>
                    <p>🟠 Orange → When comparing</p>
                    <p> 🔴 Red → When shifting an element</p>
                    <p>🟣 When inserting an element into its final position</p>
                    <p>🟢 Green → Sorted portion (final position)</p>
                  </div>
                  <div>
                    <div>
                      <strong className="text-xl text-gray-500">
                        Insertion Sort Explanation
                      </strong>
                      <li>
                        <b>Pick the Next Element:</b> Start from the second
                        element and pick it as the "key" (since the first
                        element is already considered sorted).
                      </li>
                      <li>
                        <b>Compare and Shift:</b>🟠Compare the key with elements
                        in the sorted part (to its left). 🔴Shift elements one
                        position right if they are greater than the key.
                      </li>
                      <li>
                        <b>Insert at the Correct Position:</b>🟣Once the correct
                        position is found, insert the key into its place.
                        shrinks.
                      </li>
                      <li>
                        <b> Expand the Sorted Part:</b>🟢The sorted portion of
                        the array grows by one element, and the unsorted part
                        shrinks.
                      </li>
                      <li>
                        <b>Repeat Until Sorted.</b>
                      </li>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
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
