import { useEffect, useState } from "react"

const BookTicket = () => {
  const [theatreName, setTheatreName] = useState('');
  const [leftMatrix, setLeftMatrix] = useState<any[]>([]);
  const [rightMatrix, setRightMatrix] = useState<any[]>([]);
  const [bottomMatrix, setBottomMatrix] = useState<any[]>([]);

  let alphabets = ['A', 'B', 'C', 'D', 'E']
  useEffect(() => {
    const arr: any[] = [];
    for (let row = 0; row < 4; row++) {
      for (let j = 0; j < 12; j++) {
        arr.push({ row: alphabets[row], num: j + 1 });
      }
    }

    setLeftMatrix(arr);
    setRightMatrix(arr);

    const newArr: any[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 24; j++) {
        newArr.push({ row: alphabets[i], num: j + 1 });
      }
    }
    setBottomMatrix(newArr);
  }, [])

  return (
    <div className="flex flex-col justify-center text-gray-400">
      {/* Theatre Name */}
      <div className="flex flex-col w-full items-center">
        <label htmlFor="theatreName">
          <h1 className="text-xl mt-3">Theatre Name</h1>
        </label>
        <input
            type="text"
            onChange={(e) => setTheatreName(e.target.value)}
            value={theatreName}
            style={{ height: 40, outline: 'none' }}
            className="mt-2 w-3/6 p-2 rounded-xl bg-gray-600 text-white"
            placeholder="Enter the theater name"
        />
        <button className="border border-white px-10 py-1 mt-4 rounded-xl hover:bg-gray-700">Add Theatre</button>
      </div>

      {/* Seat Layout */}
      <div style={{ height: '72vh' }} className="w-full flex flex-col items-center mt-6">
        <div className="h-3/5 flex justify-between w-full gap-9">
          {/* LEFT MATRIX */}
          <div id="left-matrix" className="w-6/12 p-2 grid grid-cols-12 gap-1 ml-5 m-3">
            {leftMatrix.map((seat, index) => (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center text-xs border rounded cursor-pointer hover:bg-green-700"
              >
                {seat.row}{seat.num}
              </div>
            ))}
          </div>

          {/* RIGHT MATRIX */}
          <div id="right-matrix" className="w-6/12 p-2 grid grid-cols-12 gap-1 m-3">
            {rightMatrix.map((seat, index) => (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center text-xs border rounded cursor-pointer hover:bg-green-700"
              >
                {seat.row}{seat.num}
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM MATRIX */}
        <div className="h-2/5 w-full flex justify-center p-2">
        <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-1">
            {bottomMatrix.map((seat, index) => (
            <div
                key={index}
                className="w-8 h-8 flex items-center justify-center text-xs border rounded cursor-pointer hover:bg-green-700"
            >
                {seat.row}{seat.num}
            </div>
            ))}
        </div>
        </div>


      </div>
    </div>
  )
}

export default BookTicket
