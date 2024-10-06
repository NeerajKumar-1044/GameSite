import React, {useState} from 'react'
import Turn from "./Turn.js"

function TicTacToe() {
  const [Heading, setHeading] = useState("TicTacToe")


  async function HandleTurn(value) {
    //const turn = Turn(val, value);

  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-black"
      style={{ backgroundImage: "url('../../images/bg-image.jpg')" }}
    >
      <h1 className="text-3xl font-bold mb-4 text-[#b00437]">{Heading}</h1>

      <div className="grid grid-cols-3 gap-4 text-[#68089c]">
        <div className="h-32 w-32 bg-[#dee3ca] flex items-center justify-center shadow-md rounded-lg text-7xl" onClick={HandleTurn(1)}>{}</div>
        <div className="h-32 w-32 bg-[#dee3ca] flex items-center justify-center shadow-md rounded-lg text-7xl" onClick={HandleTurn(2)}>{}</div>
        <div className="h-32 w-32 bg-[#dee3ca] flex items-center justify-center shadow-md rounded-lg text-7xl" onClick={HandleTurn(3)}>{}</div>
        <div className="h-32 w-32 bg-[#dee3ca] flex items-center justify-center shadow-md rounded-lg text-7xl" onClick={HandleTurn(4)}>{}</div>
        <div className="h-32 w-32 bg-[#dee3ca] flex items-center justify-center shadow-md rounded-lg text-7xl" onClick={HandleTurn(5)}>{}</div>
        <div className="h-32 w-32 bg-[#dee3ca] flex items-center justify-center shadow-md rounded-lg text-7xl" onClick={HandleTurn(6)}>{}</div>
        <div className="h-32 w-32 bg-[#dee3ca] flex items-center justify-center shadow-md rounded-lg text-7xl" onClick={HandleTurn(7)}>{}</div>
        <div className="h-32 w-32 bg-[#dee3ca] flex items-center justify-center shadow-md rounded-lg text-7xl" onClick={HandleTurn(8)}>{}</div>
        <div className="h-32 w-32 bg-[#dee3ca] flex items-center justify-center shadow-md rounded-lg text-7xl" onClick={HandleTurn(9)}>{}</div>
      </div>
    </div>
  )
}

export default TicTacToe