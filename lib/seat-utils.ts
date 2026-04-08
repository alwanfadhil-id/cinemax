import type { Seat } from '@/components/seat-map';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const SEATS_PER_ROW = 10;

const SEAT_PRICES: Record<string, Record<'vip' | 'premium' | 'regular', number>> = {
  A: { vip: 100000, premium: 100000, regular: 100000 },
  B: { vip: 100000, premium: 100000, regular: 100000 },
  C: { vip: 75000, premium: 75000, regular: 75000 },
  D: { vip: 75000, premium: 75000, regular: 75000 },
  E: { vip: 50000, premium: 50000, regular: 50000 },
  F: { vip: 50000, premium: 50000, regular: 50000 },
  G: { vip: 50000, premium: 50000, regular: 50000 },
};

function getCategory(row: string): 'vip' | 'premium' | 'regular' {
  if (row === 'A' || row === 'B') return 'vip';
  if (row === 'C' || row === 'D') return 'premium';
  return 'regular';
}

function getPrice(row: string): number {
  const category = getCategory(row);
  return SEAT_PRICES[row][category];
}

export function generateSeats(): Seat[] {
  const seats: Seat[] = [];
  const occupiedSeats = new Set<string>();

  // Randomly occupy about 30% of seats
  const totalSeats = ROWS.length * SEATS_PER_ROW;
  const occupiedCount = Math.floor(totalSeats * 0.3);
  const indices = new Set<number>();

  while (indices.size < occupiedCount) {
    indices.add(Math.floor(Math.random() * totalSeats));
  }

  let seatIndex = 0;
  for (const row of ROWS) {
    for (let i = 1; i <= SEATS_PER_ROW; i++) {
      const isOccupied = indices.has(seatIndex);
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        category: getCategory(row),
        status: isOccupied ? 'occupied' : 'available',
        price: getPrice(row),
      });
      seatIndex++;
    }
  }

  return seats;
}
