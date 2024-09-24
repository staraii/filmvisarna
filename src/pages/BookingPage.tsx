import "./bookingPage.css";

import { useState } from "react";

export default function BookingPage() {
  const [tickets, setTickets] = useState<number>(2);
  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);
  const [hoveredSeats, setHoveredSeats] = useState<string[]>([]);

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
  function displaySeats(row: number, index: number, seatCount: number) {
    let hoveredSeatIds: string[] = [];
    for (let i = 0; i < tickets; i++) {
      if (index + i < seatCount) {
        hoveredSeatIds.push(`${row}:${index + i + 1}`);
      }
    }
    setHoveredSeats(hoveredSeatIds);
  }

  const seatGrid = Object.entries(seats).map(([row, seatCount]) => (
    <div key={row} className="d-flex flex-row-reverse">
      <div className="">
        {Array.from({ length: seatCount })
          .map((_, index) => {
            const seatId = `${row}:${index + 1}`;

            return (
              <button
                onClick={() => handleSeatSelect(Number(row), index + 1)}
                onMouseOver={() => displaySeats(Number(row), index, seatCount)}
                key={seatId}
                className={`seat ${
                  hoveredSeats.includes(seatId) ? "hovered-seat" : ""
                }`}
              >
                {index + 1}
              </button>
            );
          })
          .reverse()}
      </div>
    </div>
  ));
  //gör om sätena till en klass? seatgrid constructor

  function handleSeatSelect(row: number, index: number) {
    //med stolen row och index som utgångspunkt, välj sedan row + antalet biljetter som valts
    setSelectedSeat([]);
    let seat = index + 1;

    for (let i = 0; i < tickets; i++) {
      setSelectedSeat((oldSelectedSeat) => [
        ...oldSelectedSeat,
        row + ":" + (seat + i - 1) + " ",
      ]);
    }
  }

  return (
    <>
      <body className=" h-auto d-flex flex-column container ">
        <div className="container text-center booking-header">
          <div className="row pt-4">
            <div className=" col d-flex align-items-center">
              <h1 className="">Heat</h1>
            </div>
            <span className="col d-flex align-items-center">
              <h5>onsdag 18 sep</h5>
              <h5 className="p-1">21:00-22:43</h5>
            </span>
            <span className="col d-flex align-items-center">
              <p>(Sv.text) (Eng.tal)</p>
              <p> 12+</p>
            </span>
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
