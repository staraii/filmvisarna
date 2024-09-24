import "./bookingPage.css";

import { useState } from "react";

export default function BookingPage() {
  const [tickets, setTickets] = useState<number>(2);
  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);

  const seats = {
    1: 8,
    2: 9,
    3: 10,
    4: 10,
    5: 10,
    6: 10,
    7: 12,
    8: 12,
  };

  const seatGrid = Object.entries(seats).map(([row, seatCount]) => (
    <div key={row} className="d-flex flex-row-reverse">
      <div className="">
        {Array.from({ length: seatCount })
          .map((_, index) => (
            <button
              onClick={() => handleSeatSelect(Number(row), index)}
              key={index}
              className="seat"
            >
              {index + 1}
            </button>
          ))
          .reverse()}
      </div>
    </div>
  ));
  //gör om sätena till en klass? seatgrid constructor

  function handleSeatSelect(row: number, index: number) {
    //med stolen row och index som utgångspunkt, välj sedan row + antalet biljetter som valts
    let seat = index + 1;

    for (let i = 0; i < tickets; i++) {
      setSelectedSeat((oldSelectedSeat) => [
        ...oldSelectedSeat,
        row + ":" + (seat + i) + " ",
      ]);
      console.log(selectedSeat);
    }
  }

  return (
    <>
      <body className=" h-auto d-flex flex-column container">
        <div className="container text-center booking-header">
          <div className="row">
            <div className="col">
              <h1 className="pt-5">Heat</h1>
            </div>
            <span className="col"></span>
            <div className="col">
              <p>onsdag 18 sep</p>
              <p>21:00-22:43</p>
              <p>(Sv.text) (Eng.tal)</p>
              <p>12+</p>
            </div>
          </div>
        </div>
        <div className="d-flex w-100 justify-content-center">
          <section className="container bg-white w-50 row">
            <div className="border-2 border-black"></div>
          </section>
        </div>

        <div className="w-100 h-100 bg-black p-3 d-flex flex-column">
          <h4>Stora salongen</h4>
          <section className="d-flex align-items-center">
            <button
              onClick={() => setTickets((prevTickets) => prevTickets + 1)}
              className=""
            >
              +
            </button>
            <p className="m-2">{tickets}</p>
            <button
              onClick={() =>
                setTickets((prevTickets) => Math.max(prevTickets - 1, 0))
              }
              className=""
            >
              -
            </button>
            <p className="m-2">Biljetter</p>
          </section>

          <div className="d-flex flex-column seat-container align-items-center">
            {seatGrid}
          </div>
        </div>
      </body>
      <footer className="d-flex w-100 justify-content-center align-items-center container booking-header flex-row justify-content-around">
        <h4>Order:</h4>
        <span>
          <p>Biljetter: {tickets}</p>
          <p>Platser: {selectedSeat}</p>
          <p>Att betala: {tickets * 150}kr</p>
        </span>
        <button>Boka</button>
      </footer>
    </>
  );
}
