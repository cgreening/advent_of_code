{
  const commands = [
    { op: "R", amount: 90 },
    { op: "W", amount: 5 },
    { op: "R", amount: 90 },
    { op: "F", amount: 3 },
    { op: "E", amount: 4 },
    { op: "L", amount: 90 },
    { op: "N", amount: 5 },
    { op: "F", amount: 100 },
    { op: "W", amount: 1 },
    { op: "R", amount: 180 },
    { op: "F", amount: 11 },
    { op: "S", amount: 1 },
    { op: "E", amount: 4 },
    { op: "F", amount: 75 },
    { op: "N", amount: 4 },
    { op: "W", amount: 1 },
    { op: "F", amount: 66 },
    { op: "N", amount: 3 },
    { op: "L", amount: 90 },
    { op: "F", amount: 2 },
    { op: "R", amount: 90 },
    { op: "E", amount: 1 },
    { op: "S", amount: 3 },
    { op: "F", amount: 84 },
    { op: "L", amount: 90 },
    { op: "N", amount: 1 },
    { op: "R", amount: 90 },
    { op: "F", amount: 49 },
    { op: "S", amount: 1 },
    { op: "R", amount: 90 },
    { op: "E", amount: 2 },
    { op: "R", amount: 90 },
    { op: "N", amount: 1 },
    { op: "L", amount: 90 },
    { op: "S", amount: 1 },
    { op: "R", amount: 90 },
    { op: "F", amount: 100 },
    { op: "E", amount: 4 },
    { op: "R", amount: 90 },
    { op: "N", amount: 3 },
    { op: "W", amount: 1 },
    { op: "L", amount: 180 },
    { op: "E", amount: 4 },
    { op: "F", amount: 30 },
    { op: "N", amount: 5 },
    { op: "F", amount: 40 },
    { op: "R", amount: 270 },
    { op: "E", amount: 4 },
    { op: "L", amount: 90 },
    { op: "F", amount: 94 },
    { op: "L", amount: 90 },
    { op: "E", amount: 3 },
    { op: "F", amount: 61 },
    { op: "S", amount: 4 },
    { op: "F", amount: 78 },
    { op: "S", amount: 2 },
    { op: "R", amount: 180 },
    { op: "W", amount: 2 },
    { op: "F", amount: 14 },
    { op: "L", amount: 90 },
    { op: "F", amount: 100 },
    { op: "L", amount: 90 },
    { op: "F", amount: 15 },
    { op: "E", amount: 4 },
    { op: "L", amount: 90 },
    { op: "F", amount: 77 },
    { op: "S", amount: 2 },
    { op: "F", amount: 58 },
    { op: "R", amount: 90 },
    { op: "E", amount: 2 },
    { op: "F", amount: 41 },
    { op: "N", amount: 4 },
    { op: "R", amount: 180 },
    { op: "S", amount: 2 },
    { op: "F", amount: 91 },
    { op: "S", amount: 3 },
    { op: "F", amount: 52 },
    { op: "W", amount: 4 },
    { op: "S", amount: 3 },
    { op: "F", amount: 73 },
    { op: "S", amount: 4 },
    { op: "F", amount: 50 },
    { op: "W", amount: 3 },
    { op: "L", amount: 90 },
    { op: "F", amount: 70 },
    { op: "N", amount: 5 },
    { op: "N", amount: 2 },
    { op: "L", amount: 90 },
    { op: "F", amount: 100 },
    { op: "W", amount: 1 },
    { op: "R", amount: 90 },
    { op: "N", amount: 4 },
    { op: "E", amount: 1 },
    { op: "R", amount: 90 },
    { op: "F", amount: 63 },
    { op: "L", amount: 90 },
    { op: "W", amount: 4 },
    { op: "F", amount: 30 },
    { op: "N", amount: 3 },
    { op: "L", amount: 90 },
    { op: "F", amount: 76 },
    { op: "R", amount: 90 },
    { op: "W", amount: 1 },
    { op: "N", amount: 4 },
    { op: "R", amount: 180 },
    { op: "F", amount: 20 },
    { op: "S", amount: 4 },
    { op: "F", amount: 8 },
    { op: "R", amount: 90 },
    { op: "F", amount: 47 },
    { op: "W", amount: 2 },
    { op: "L", amount: 180 },
    { op: "W", amount: 2 },
    { op: "F", amount: 75 },
    { op: "F", amount: 56 },
    { op: "L", amount: 90 },
    { op: "F", amount: 35 },
    { op: "R", amount: 90 },
    { op: "S", amount: 2 },
    { op: "L", amount: 90 },
    { op: "F", amount: 1 },
    { op: "W", amount: 3 },
    { op: "F", amount: 44 },
    { op: "L", amount: 90 },
    { op: "S", amount: 2 },
    { op: "F", amount: 93 },
    { op: "E", amount: 1 },
    { op: "N", amount: 5 },
    { op: "F", amount: 83 },
    { op: "F", amount: 28 },
    { op: "S", amount: 1 },
    { op: "R", amount: 90 },
    { op: "N", amount: 4 },
    { op: "W", amount: 2 },
    { op: "E", amount: 4 },
    { op: "F", amount: 48 },
    { op: "N", amount: 3 },
    { op: "F", amount: 65 },
    { op: "E", amount: 1 },
    { op: "R", amount: 180 },
    { op: "W", amount: 4 },
    { op: "S", amount: 1 },
    { op: "W", amount: 5 },
    { op: "S", amount: 3 },
    { op: "F", amount: 18 },
    { op: "E", amount: 3 },
    { op: "S", amount: 3 },
    { op: "R", amount: 90 },
    { op: "W", amount: 5 },
    { op: "R", amount: 180 },
    { op: "W", amount: 2 },
    { op: "R", amount: 90 },
    { op: "F", amount: 71 },
    { op: "W", amount: 2 },
    { op: "R", amount: 90 },
    { op: "S", amount: 4 },
    { op: "L", amount: 180 },
    { op: "N", amount: 4 },
    { op: "W", amount: 3 },
    { op: "S", amount: 5 },
    { op: "F", amount: 12 },
    { op: "L", amount: 90 },
    { op: "F", amount: 83 },
    { op: "E", amount: 5 },
    { op: "W", amount: 2 },
    { op: "N", amount: 3 },
    { op: "E", amount: 1 },
    { op: "S", amount: 4 },
    { op: "F", amount: 95 },
    { op: "R", amount: 90 },
    { op: "F", amount: 77 },
    { op: "L", amount: 270 },
    { op: "N", amount: 2 },
    { op: "W", amount: 4 },
    { op: "F", amount: 45 },
    { op: "W", amount: 5 },
    { op: "R", amount: 90 },
    { op: "W", amount: 5 },
    { op: "N", amount: 1 },
    { op: "R", amount: 90 },
    { op: "E", amount: 2 },
    { op: "F", amount: 5 },
    { op: "L", amount: 270 },
    { op: "E", amount: 5 },
    { op: "F", amount: 79 },
    { op: "L", amount: 90 },
    { op: "F", amount: 57 },
    { op: "R", amount: 90 },
    { op: "E", amount: 5 },
    { op: "F", amount: 46 },
    { op: "N", amount: 5 },
    { op: "F", amount: 30 },
    { op: "E", amount: 3 },
    { op: "N", amount: 4 },
    { op: "W", amount: 2 },
    { op: "F", amount: 100 },
    { op: "E", amount: 3 },
    { op: "S", amount: 5 },
    { op: "W", amount: 5 },
    { op: "F", amount: 34 },
    { op: "E", amount: 4 },
    { op: "S", amount: 3 },
    { op: "F", amount: 30 },
    { op: "S", amount: 4 },
    { op: "L", amount: 90 },
    { op: "S", amount: 2 },
    { op: "F", amount: 51 },
    { op: "W", amount: 5 },
    { op: "F", amount: 41 },
    { op: "E", amount: 5 },
    { op: "N", amount: 1 },
    { op: "R", amount: 90 },
    { op: "S", amount: 4 },
    { op: "F", amount: 97 },
    { op: "L", amount: 180 },
    { op: "S", amount: 1 },
    { op: "F", amount: 38 },
    { op: "N", amount: 3 },
    { op: "E", amount: 3 },
    { op: "R", amount: 90 },
    { op: "S", amount: 5 },
    { op: "F", amount: 59 },
    { op: "L", amount: 270 },
    { op: "W", amount: 2 },
    { op: "F", amount: 71 },
    { op: "L", amount: 90 },
    { op: "N", amount: 3 },
    { op: "F", amount: 36 },
    { op: "L", amount: 90 },
    { op: "S", amount: 1 },
    { op: "F", amount: 24 },
    { op: "S", amount: 1 },
    { op: "R", amount: 90 },
    { op: "F", amount: 56 },
    { op: "S", amount: 3 },
    { op: "F", amount: 53 },
    { op: "E", amount: 1 },
    { op: "E", amount: 3 },
    { op: "F", amount: 78 },
    { op: "R", amount: 180 },
    { op: "N", amount: 2 },
    { op: "E", amount: 4 },
    { op: "R", amount: 90 },
    { op: "E", amount: 1 },
    { op: "S", amount: 2 },
    { op: "W", amount: 3 },
    { op: "S", amount: 3 },
    { op: "F", amount: 64 },
    { op: "W", amount: 1 },
    { op: "R", amount: 180 },
    { op: "F", amount: 73 },
    { op: "F", amount: 92 },
    { op: "S", amount: 5 },
    { op: "R", amount: 180 },
    { op: "W", amount: 4 },
    { op: "N", amount: 5 },
    { op: "E", amount: 2 },
    { op: "R", amount: 270 },
    { op: "E", amount: 5 },
    { op: "N", amount: 2 },
    { op: "E", amount: 3 },
    { op: "S", amount: 3 },
    { op: "R", amount: 90 },
    { op: "S", amount: 4 },
    { op: "W", amount: 2 },
    { op: "N", amount: 4 },
    { op: "E", amount: 5 },
    { op: "L", amount: 180 },
    { op: "F", amount: 6 },
    { op: "R", amount: 90 },
    { op: "W", amount: 2 },
    { op: "N", amount: 1 },
    { op: "L", amount: 90 },
    { op: "F", amount: 16 },
    { op: "N", amount: 4 },
    { op: "R", amount: 90 },
    { op: "F", amount: 65 },
    { op: "R", amount: 90 },
    { op: "N", amount: 3 },
    { op: "L", amount: 90 },
    { op: "W", amount: 5 },
    { op: "R", amount: 90 },
    { op: "N", amount: 1 },
    { op: "F", amount: 41 },
    { op: "W", amount: 2 },
    { op: "S", amount: 1 },
    { op: "W", amount: 3 },
    { op: "F", amount: 69 },
    { op: "W", amount: 5 },
    { op: "N", amount: 4 },
    { op: "F", amount: 71 },
    { op: "W", amount: 4 },
    { op: "R", amount: 90 },
    { op: "F", amount: 94 },
    { op: "W", amount: 1 },
    { op: "F", amount: 30 },
    { op: "W", amount: 2 },
    { op: "N", amount: 2 },
    { op: "F", amount: 65 },
    { op: "R", amount: 90 },
    { op: "N", amount: 4 },
    { op: "R", amount: 90 },
    { op: "E", amount: 1 },
    { op: "L", amount: 180 },
    { op: "E", amount: 2 },
    { op: "L", amount: 180 },
    { op: "S", amount: 4 },
    { op: "R", amount: 90 },
    { op: "E", amount: 4 },
    { op: "R", amount: 90 },
    { op: "E", amount: 5 },
    { op: "S", amount: 3 },
    { op: "F", amount: 73 },
    { op: "N", amount: 4 },
    { op: "W", amount: 4 },
    { op: "S", amount: 2 },
    { op: "E", amount: 4 },
    { op: "L", amount: 90 },
    { op: "N", amount: 4 },
    { op: "F", amount: 100 },
    { op: "S", amount: 4 },
    { op: "L", amount: 90 },
    { op: "E", amount: 3 },
    { op: "N", amount: 3 },
    { op: "R", amount: 90 },
    { op: "N", amount: 1 },
    { op: "W", amount: 4 },
    { op: "S", amount: 3 },
    { op: "S", amount: 5 },
    { op: "F", amount: 46 },
    { op: "N", amount: 5 },
    { op: "R", amount: 180 },
    { op: "F", amount: 75 },
    { op: "S", amount: 5 },
    { op: "L", amount: 90 },
    { op: "F", amount: 42 },
    { op: "L", amount: 90 },
    { op: "L", amount: 90 },
    { op: "W", amount: 2 },
    { op: "F", amount: 67 },
    { op: "W", amount: 2 },
    { op: "W", amount: 3 },
    { op: "E", amount: 3 },
    { op: "L", amount: 90 },
    { op: "W", amount: 3 },
    { op: "F", amount: 72 },
    { op: "N", amount: 3 },
    { op: "W", amount: 2 },
    { op: "L", amount: 90 },
    { op: "N", amount: 4 },
    { op: "F", amount: 12 },
    { op: "W", amount: 2 },
    { op: "F", amount: 20 },
    { op: "W", amount: 2 },
    { op: "F", amount: 5 },
    { op: "N", amount: 5 },
    { op: "W", amount: 5 },
    { op: "L", amount: 180 },
    { op: "W", amount: 2 },
    { op: "F", amount: 45 },
    { op: "W", amount: 4 },
    { op: "L", amount: 90 },
    { op: "E", amount: 3 },
    { op: "L", amount: 90 },
    { op: "S", amount: 2 },
    { op: "F", amount: 69 },
    { op: "R", amount: 90 },
    { op: "W", amount: 3 },
    { op: "R", amount: 180 },
    { op: "N", amount: 5 },
    { op: "E", amount: 3 },
    { op: "F", amount: 8 },
    { op: "S", amount: 5 },
    { op: "R", amount: 90 },
    { op: "S", amount: 5 },
    { op: "F", amount: 64 },
    { op: "R", amount: 90 },
    { op: "W", amount: 4 },
    { op: "F", amount: 46 },
    { op: "R", amount: 90 },
    { op: "W", amount: 3 },
    { op: "N", amount: 1 },
    { op: "F", amount: 6 },
    { op: "N", amount: 4 },
    { op: "R", amount: 90 },
    { op: "F", amount: 38 },
    { op: "F", amount: 5 },
    { op: "E", amount: 5 },
    { op: "N", amount: 4 },
    { op: "R", amount: 90 },
    { op: "W", amount: 1 },
    { op: "F", amount: 66 },
    { op: "R", amount: 270 },
    { op: "W", amount: 3 },
    { op: "R", amount: 90 },
    { op: "W", amount: 5 },
    { op: "R", amount: 90 },
    { op: "W", amount: 2 },
    { op: "S", amount: 4 },
    { op: "W", amount: 2 },
    { op: "R", amount: 270 },
    { op: "E", amount: 5 },
    { op: "R", amount: 90 },
    { op: "S", amount: 5 },
    { op: "R", amount: 90 },
    { op: "S", amount: 1 },
    { op: "L", amount: 90 },
    { op: "N", amount: 2 },
    { op: "W", amount: 5 },
    { op: "S", amount: 3 },
    { op: "W", amount: 3 },
    { op: "L", amount: 90 },
    { op: "E", amount: 2 },
    { op: "L", amount: 90 },
    { op: "F", amount: 51 },
    { op: "R", amount: 90 },
    { op: "L", amount: 90 },
    { op: "N", amount: 3 },
    { op: "W", amount: 4 },
    { op: "N", amount: 1 },
    { op: "W", amount: 4 },
    { op: "W", amount: 4 },
    { op: "L", amount: 90 },
    { op: "F", amount: 7 },
    { op: "S", amount: 4 },
    { op: "E", amount: 1 },
    { op: "S", amount: 1 },
    { op: "R", amount: 90 },
    { op: "F", amount: 3 },
    { op: "E", amount: 4 },
    { op: "F", amount: 73 },
    { op: "W", amount: 4 },
    { op: "L", amount: 90 },
    { op: "W", amount: 4 },
    { op: "F", amount: 4 },
    { op: "R", amount: 90 },
    { op: "E", amount: 5 },
    { op: "S", amount: 2 },
    { op: "E", amount: 3 },
    { op: "L", amount: 90 },
    { op: "F", amount: 77 },
    { op: "W", amount: 3 },
    { op: "L", amount: 90 },
    { op: "S", amount: 5 },
    { op: "W", amount: 4 },
    { op: "S", amount: 3 },
    { op: "E", amount: 4 },
    { op: "R", amount: 270 },
    { op: "S", amount: 5 },
    { op: "F", amount: 99 },
    { op: "E", amount: 4 },
    { op: "E", amount: 5 },
    { op: "L", amount: 90 },
    { op: "N", amount: 2 },
    { op: "F", amount: 58 },
    { op: "R", amount: 90 },
    { op: "E", amount: 2 },
    { op: "N", amount: 1 },
    { op: "W", amount: 4 },
    { op: "F", amount: 85 },
    { op: "W", amount: 4 },
    { op: "N", amount: 2 },
    { op: "E", amount: 3 },
    { op: "L", amount: 90 },
    { op: "E", amount: 4 },
    { op: "R", amount: 90 },
    { op: "N", amount: 4 },
    { op: "E", amount: 3 },
    { op: "F", amount: 64 },
    { op: "W", amount: 5 },
    { op: "S", amount: 5 },
    { op: "F", amount: 89 },
    { op: "F", amount: 29 },
    { op: "L", amount: 90 },
    { op: "F", amount: 80 },
    { op: "N", amount: 1 },
    { op: "L", amount: 90 },
    { op: "W", amount: 4 },
    { op: "S", amount: 5 },
    { op: "F", amount: 76 },
    { op: "E", amount: 5 },
    { op: "F", amount: 83 },
    { op: "E", amount: 2 },
    { op: "F", amount: 60 },
    { op: "W", amount: 3 },
    { op: "N", amount: 4 },
    { op: "W", amount: 1 },
    { op: "R", amount: 90 },
    { op: "F", amount: 25 },
    { op: "W", amount: 5 },
    { op: "S", amount: 3 },
    { op: "W", amount: 5 },
    { op: "L", amount: 180 },
    { op: "E", amount: 4 },
    { op: "F", amount: 79 },
    { op: "S", amount: 1 },
    { op: "W", amount: 5 },
    { op: "F", amount: 42 },
    { op: "W", amount: 3 },
    { op: "F", amount: 6 },
    { op: "E", amount: 5 },
    { op: "L", amount: 90 },
    { op: "S", amount: 3 },
    { op: "L", amount: 90 },
    { op: "N", amount: 2 },
    { op: "L", amount: 270 },
    { op: "F", amount: 80 },
    { op: "W", amount: 3 },
    { op: "L", amount: 180 },
    { op: "E", amount: 4 },
    { op: "N", amount: 2 },
    { op: "F", amount: 87 },
    { op: "W", amount: 5 },
    { op: "W", amount: 5 },
    { op: "R", amount: 90 },
    { op: "L", amount: 90 },
    { op: "W", amount: 3 },
    { op: "R", amount: 180 },
    { op: "F", amount: 69 },
    { op: "L", amount: 90 },
    { op: "F", amount: 9 },
    { op: "E", amount: 4 },
    { op: "F", amount: 37 },
    { op: "L", amount: 90 },
    { op: "S", amount: 3 },
    { op: "F", amount: 50 },
    { op: "L", amount: 90 },
    { op: "W", amount: 1 },
    { op: "F", amount: 70 },
    { op: "N", amount: 5 },
    { op: "L", amount: 90 },
    { op: "W", amount: 4 },
    { op: "N", amount: 2 },
    { op: "W", amount: 5 },
    { op: "F", amount: 19 },
    { op: "N", amount: 4 },
    { op: "W", amount: 2 },
    { op: "N", amount: 1 },
    { op: "W", amount: 4 },
    { op: "R", amount: 90 },
    { op: "F", amount: 56 },
    { op: "W", amount: 1 },
    { op: "L", amount: 90 },
    { op: "E", amount: 4 },
    { op: "R", amount: 90 },
    { op: "S", amount: 5 },
    { op: "F", amount: 2 },
    { op: "L", amount: 90 },
    { op: "N", amount: 2 },
    { op: "F", amount: 77 },
    { op: "E", amount: 1 },
    { op: "L", amount: 270 },
    { op: "F", amount: 31 },
    { op: "W", amount: 1 },
    { op: "N", amount: 4 },
    { op: "L", amount: 90 },
    { op: "W", amount: 2 },
    { op: "L", amount: 180 },
    { op: "W", amount: 1 },
    { op: "S", amount: 2 },
    { op: "E", amount: 3 },
    { op: "F", amount: 93 },
    { op: "N", amount: 5 },
    { op: "E", amount: 4 },
    { op: "F", amount: 39 },
    { op: "S", amount: 4 },
    { op: "W", amount: 3 },
    { op: "L", amount: 90 },
    { op: "N", amount: 1 },
    { op: "R", amount: 90 },
    { op: "S", amount: 2 },
    { op: "F", amount: 11 },
    { op: "F", amount: 95 },
    { op: "E", amount: 3 },
    { op: "S", amount: 4 },
    { op: "W", amount: 4 },
    { op: "R", amount: 90 },
    { op: "F", amount: 56 },
    { op: "N", amount: 3 },
    { op: "F", amount: 16 },
    { op: "L", amount: 270 },
    { op: "E", amount: 2 },
    { op: "S", amount: 3 },
    { op: "F", amount: 56 },
    { op: "W", amount: 4 },
    { op: "N", amount: 1 },
    { op: "E", amount: 1 },
    { op: "N", amount: 5 },
    { op: "R", amount: 90 },
    { op: "F", amount: 86 },
    { op: "N", amount: 5 },
    { op: "R", amount: 90 },
    { op: "S", amount: 1 },
    { op: "S", amount: 4 },
    { op: "L", amount: 90 },
    { op: "E", amount: 2 },
    { op: "N", amount: 1 },
    { op: "F", amount: 28 },
    { op: "E", amount: 5 },
    { op: "R", amount: 180 },
    { op: "F", amount: 93 },
    { op: "L", amount: 90 },
    { op: "F", amount: 84 },
    { op: "E", amount: 5 },
    { op: "R", amount: 180 },
    { op: "E", amount: 4 },
    { op: "F", amount: 25 },
    { op: "L", amount: 90 },
    { op: "E", amount: 5 },
    { op: "N", amount: 2 },
    { op: "R", amount: 270 },
    { op: "F", amount: 13 },
    { op: "N", amount: 4 },
    { op: "F", amount: 91 },
    { op: "E", amount: 3 },
    { op: "F", amount: 7 },
    { op: "S", amount: 1 },
    { op: "W", amount: 5 },
    { op: "W", amount: 1 },
    { op: "F", amount: 67 },
    { op: "S", amount: 4 },
    { op: "W", amount: 5 },
    { op: "R", amount: 90 },
    { op: "L", amount: 180 },
    { op: "E", amount: 4 },
    { op: "S", amount: 2 },
    { op: "R", amount: 90 },
    { op: "S", amount: 2 },
    { op: "F", amount: 45 },
    { op: "N", amount: 4 },
    { op: "E", amount: 3 },
    { op: "N", amount: 4 },
    { op: "F", amount: 53 },
    { op: "N", amount: 3 },
    { op: "E", amount: 3 },
    { op: "S", amount: 4 },
    { op: "R", amount: 90 },
    { op: "S", amount: 1 },
    { op: "F", amount: 52 },
    { op: "N", amount: 2 },
    { op: "S", amount: 5 },
    { op: "E", amount: 2 },
    { op: "N", amount: 3 },
    { op: "F", amount: 1 },
    { op: "L", amount: 180 },
    { op: "N", amount: 3 },
    { op: "E", amount: 2 },
    { op: "F", amount: 31 },
    { op: "S", amount: 2 },
    { op: "S", amount: 5 },
    { op: "N", amount: 2 },
    { op: "F", amount: 5 },
    { op: "W", amount: 4 },
    { op: "R", amount: 90 },
    { op: "R", amount: 90 },
    { op: "W", amount: 1 },
    { op: "F", amount: 34 },
    { op: "W", amount: 2 },
    { op: "L", amount: 90 },
    { op: "E", amount: 2 },
    { op: "R", amount: 180 },
    { op: "N", amount: 5 },
    { op: "W", amount: 2 },
    { op: "R", amount: 180 },
    { op: "N", amount: 2 },
    { op: "S", amount: 2 },
    { op: "N", amount: 3 },
    { op: "F", amount: 48 },
    { op: "S", amount: 2 },
    { op: "L", amount: 90 },
    { op: "F", amount: 81 },
    { op: "N", amount: 2 },
    { op: "F", amount: 16 },
    { op: "W", amount: 4 },
    { op: "F", amount: 40 },
    { op: "L", amount: 90 },
    { op: "N", amount: 3 },
    { op: "L", amount: 180 },
    { op: "N", amount: 2 },
    { op: "L", amount: 90 },
    { op: "E", amount: 5 },
    { op: "F", amount: 8 },
    { op: "F", amount: 6 },
    { op: "R", amount: 90 },
    { op: "S", amount: 3 },
    { op: "W", amount: 5 },
    { op: "W", amount: 1 },
    { op: "R", amount: 90 },
    { op: "F", amount: 18 },
    { op: "S", amount: 3 },
    { op: "L", amount: 90 },
    { op: "F", amount: 19 },
    { op: "R", amount: 90 },
    { op: "F", amount: 46 },
    { op: "F", amount: 37 },
    { op: "R", amount: 90 },
    { op: "N", amount: 3 },
    { op: "W", amount: 4 },
    { op: "E", amount: 3 },
    { op: "F", amount: 28 },
    { op: "E", amount: 3 },
    { op: "N", amount: 5 },
    { op: "L", amount: 90 },
    { op: "S", amount: 4 },
    { op: "E", amount: 1 },
    { op: "F", amount: 28 },
    { op: "L", amount: 90 },
    { op: "N", amount: 5 },
    { op: "R", amount: 180 },
    { op: "N", amount: 1 },
    { op: "L", amount: 90 },
    { op: "E", amount: 3 },
    { op: "S", amount: 1 },
    { op: "R", amount: 180 },
    { op: "F", amount: 32 },
    { op: "R", amount: 90 },
    { op: "N", amount: 4 },
    { op: "F", amount: 22 },
    { op: "L", amount: 90 },
    { op: "S", amount: 5 },
    { op: "E", amount: 4 },
    { op: "R", amount: 90 },
    { op: "F", amount: 70 },
    { op: "W", amount: 4 },
    { op: "F", amount: 39 },
    { op: "S", amount: 4 },
    { op: "L", amount: 90 },
    { op: "N", amount: 1 },
    { op: "L", amount: 90 },
    { op: "F", amount: 6 },
    { op: "L", amount: 90 },
    { op: "F", amount: 92 },
    { op: "L", amount: 90 },
    { op: "N", amount: 5 },
    { op: "L", amount: 90 },
    { op: "L", amount: 90 },
    { op: "N", amount: 5 },
    { op: "E", amount: 2 },
    { op: "L", amount: 180 },
    { op: "E", amount: 5 },
    { op: "R", amount: 90 },
    { op: "F", amount: 95 },
    { op: "N", amount: 4 },
    { op: "E", amount: 1 },
    { op: "F", amount: 77 },
    { op: "N", amount: 3 },
    { op: "R", amount: 180 },
    { op: "S", amount: 2 },
    { op: "W", amount: 2 },
    { op: "F", amount: 71 },
    { op: "F", amount: 59 },
    { op: "N", amount: 3 },
    { op: "F", amount: 10 },
    { op: "E", amount: 4 },
    { op: "L", amount: 90 },
    { op: "N", amount: 5 },
    { op: "F", amount: 9 },
    { op: "R", amount: 180 },
    { op: "W", amount: 1 },
    { op: "S", amount: 5 },
    { op: "W", amount: 5 },
    { op: "F", amount: 71 },
    { op: "E", amount: 1 },
    { op: "F", amount: 35 },
    { op: "R", amount: 90 },
    { op: "F", amount: 45 },
    { op: "N", amount: 1 },
    { op: "F", amount: 54 },
  ];

  const example = [
    { op: "F", amount: 10 },
    { op: "N", amount: 3 },
    { op: "F", amount: 7 },
    { op: "R", amount: 90 },
    { op: "F", amount: 11 },
  ];

  type State = {
    shipX: number;
    shipY: number;
    wayPointX: number;
    wayPointY: number;
  };

  function moveWayPoint(x: number, y: number) {
    return function (amount: number, state: State): State {
      return {
        ...state,
        wayPointX: state.wayPointX + x * amount,
        wayPointY: state.wayPointY + y * amount,
      };
    };
  }

  function forward(amount: number, state: State): State {
    const { shipX, shipY } = state;
    return {
      ...state,
      shipX: shipX + state.wayPointX * amount,
      shipY: shipY + state.wayPointY * amount,
    };
  }

  function rotate(direction: number) {
    return function (amount: number, state: State): State {
      const rad = (direction * (amount * Math.PI)) / 180;
      const { wayPointX, wayPointY } = state;
      const newX = Math.round(
        Math.cos(rad) * wayPointX - Math.sin(rad) * wayPointY
      );
      const newY = Math.round(
        Math.sin(rad) * wayPointX + Math.cos(rad) * wayPointY
      );
      return { ...state, wayPointX: newX, wayPointY: newY };
    };
  }

  const processors: {
    [key: string]: (amount: number, state: State) => State;
  } = {
    N: moveWayPoint(0, 1),
    E: moveWayPoint(1, 0),
    S: moveWayPoint(0, -1),
    W: moveWayPoint(-1, 0),
    F: forward,
    L: rotate(1),
    R: rotate(-1),
  };

  const startState: State = {
    wayPointX: 10,
    wayPointY: 1,
    shipX: 0,
    shipY: 0,
  };

  const finalState = commands.reduce(
    (state, command) => processors[command.op](command.amount, state),
    startState
  );

  console.log(Math.abs(finalState.shipX) + Math.abs(finalState.shipY));
}
